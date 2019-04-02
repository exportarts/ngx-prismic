import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Predicates } from 'prismic-javascript';
import ResolvedApi, { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TypedApiSearchResponse, TypedDocument } from './api.model';
import { PrismicServiceConfig, PrismicServiceConfigProvider } from './prismic-service.config';
import { encodeOptions, encodePredicates } from './encode';

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

  private cache = new Map<string, TypedApiSearchResponse<any>>();

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
        const encodedPredicates = encodePredicates(predicates);
        const encodedOptions = encodeOptions(options);

        const encodedRefPredicatesAndOptions = `${ref}${encodedPredicates}${encodedOptions}`;
        if (this.cache.has(encodedRefPredicatesAndOptions)) {
          return of(this.cache.get(encodedRefPredicatesAndOptions) as TypedApiSearchResponse<T>);
        }

        const url = `${this.config.prismicUrl}/documents/search?ref=${encodedRefPredicatesAndOptions}`;
        return this.http.get<TypedApiSearchResponse<T>>(url).pipe(
          tap(response => this.cache.set(encodedRefPredicatesAndOptions, response))
        );
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
