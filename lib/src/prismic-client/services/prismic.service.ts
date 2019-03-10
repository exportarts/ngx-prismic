import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ResolvedApi, { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';
import { iif, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TypedApiSearchResponse } from '../../models/api.model';

export interface PrismicServiceConfig {
  prismicUrl: string;
}

/**
 * Compiler-Flags:
 * - @dynamic (Allow lambda functions)
 */
// @Injectable({
//   providedIn: 'root'
// })
export class PrismicService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: PrismicServiceConfig
  ) {}

  private _api: ResolvedApi;

  private get api(): Observable<ResolvedApi> {
    return iif(
      () => this._api !== undefined,
      of(this._api),
      this.http.get<ResolvedApi>(this.config.prismicUrl).pipe(
        tap(api => this._api = api)
      )
    );
  }

  private static encodePredicates(predicates: string[]): string {
    return predicates.map(p => `&q=[${encodeURIComponent(p)}]`).join(',');
  }

  private static encodeOptions(options: QueryOptions): string {
    return Object.keys(options).map(key => {
      if (options[key] instanceof Array) {
        options[key] = (options[key] as any[]).join(',')
      }
      return `&${key}=${options[key]}`;
    }).join('');
  }

  query<T>(predicates: string[], options: QueryOptions = {}): Observable<TypedApiSearchResponse<T>> {
    return this.api.pipe(
      switchMap(api => {
        const ref = api.refs.find(r => r.isMasterRef).ref;
        const encodedQuery = PrismicService.encodePredicates(predicates);
        const encodedOptions = PrismicService.encodeOptions(options);
        const url = `${this.config.prismicUrl}/documents/search?ref=${ref}${encodedQuery}${encodedOptions}`;
        return this.http.get<TypedApiSearchResponse<T>>(url);
      })
    );
  }

}
