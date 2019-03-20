import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Predicates } from 'prismic-javascript';
import ResolvedApi, { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TypedApiSearchResponse, TypedDocument } from './api.model';
import { PrismicServiceConfig, PrismicServiceConfigProvider } from './prismic-service.config';

/**
 * Compiler-Flags:
 * - @dynamic (Allow lambda functions)
 */
@Injectable({
  providedIn: 'root'
})
export class PrismicService {

  constructor(
    private readonly http: HttpClient,
    @Inject(PrismicServiceConfigProvider) private readonly config: PrismicServiceConfig
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

  /**
   * Query the API with the specified list of predicates and query options.
   * Reference about the different options can be found in Prismic's docs:
   * - https://prismic.io/docs/javascript/query-the-api/query-predicates-reference
   * - https://prismic.io/docs/javascript/query-the-api/query-options-reference
   * 
   * @param predicates An array of predicate strings (Use the `Prismic.Predicates.*` methods)
   * @param options additional options
   */
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

  /**
   * Query the API to retrieve a single document by it's type and UID.
   *
   * @param docType API-Name of the document-type
   * @param uid The document's UID
   * @param options additional options
   */
  queryOne<T>(docType: string, uid: string, options: QueryOptions = {}): Observable<TypedDocument<T>> {
    const predicates = [
      Predicates.at(`my.${docType}.uid`, uid)
    ];

    return this.query<T>(predicates, options).pipe(
      map(reponse => reponse.results[0])
    );
  }

}
