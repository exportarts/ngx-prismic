import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import Prismic from 'prismic-javascript';
import ResolvedApi, { QueryOptions } from 'prismic-javascript/types/ResolvedApi';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TypedApiSearchResponse, TypedDocument } from '../models/api.model';
import { encodeOptions, encodePredicates } from '../utils/encode';
import { PrismicServiceConfig, PrismicServiceConfigProvider } from './prismic-service.config';

/**
 * A function that can be used to map a value of
 * type A to a value of type B inside an rxjs-map function.
 *
 * Type B is optional, so the mapping can happen inside the
 * same type. An example use case is to set default values
 * for empty properties of A, then return it without changing the type.
 */
export type ProjectorFunc<A, B = A> = (value: A, index?: number) => B;
/**
 * A default implementation of {@link ProjectorFunc} which
 * performs no modification on the value and just returns it.
 */
const noopProjectorFunc: ProjectorFunc<any> = v => v;

/**
 * Injection token to provide a spefific API Ref for the prismic api.
 *
 * For instance, this can be used to provide a Preview Token.
 */
export const API_TOKEN = new InjectionToken<string>('API_TOKEN');

/**
 * Compiler-Flags:
 * - @dynamic (Allow lambda functions)
 */
@Injectable({
  providedIn: 'root'
})
export class PrismicService {
  private readonly http: HttpClient;

  constructor(
    private readonly httpBackend: HttpBackend,
    @Inject(PrismicServiceConfigProvider) private readonly config: PrismicServiceConfig,
    @Inject(API_TOKEN) @Optional() private readonly apiToken: string
  ) {
    this.http = new HttpClient(this.httpBackend);
    this.prefillWithApiToken();
  }

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
   * A `mappingFunc` can be given to perform changes on the response object before caching
   * is applied (for example setting of default/fallback values on empty properties).
   * Using this function has the advantage of performing mapping only once on the initial call.
   *
   * @param predicates An array of predicate strings (Use the `Prismic.Predicates.*` methods)
   * @param options additional options
   * @param mappingFunc a function to map the response object inside an rxjs-map
   */
  query<T, R = T>(
      predicates: string[],
      options: QueryOptions = {},
      mappingFunc: ProjectorFunc<TypedApiSearchResponse<T>, TypedApiSearchResponse<R>> = noopProjectorFunc
    ): Observable<TypedApiSearchResponse<R>> {
    return this.api.pipe(
      switchMap(api => {
        const ref = api.refs.find(r => r.isMasterRef).ref;
        const encodedPredicates = encodePredicates(predicates);
        const encodedOptions = encodeOptions(options);

        const encodedRefPredicatesAndOptions = `${ref}${encodedPredicates}${encodedOptions}`;
        if (this.cache.has(encodedRefPredicatesAndOptions)) {
          return of(this.cache.get(encodedRefPredicatesAndOptions) as TypedApiSearchResponse<R>);
        }

        const url = `${this.config.prismicUrl}/documents/search?ref=${encodedRefPredicatesAndOptions}`;
        return this.http.get<TypedApiSearchResponse<T>>(url).pipe(
          map(mappingFunc),
          tap(response => this.cache.set(encodedRefPredicatesAndOptions, response)),
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
   * @param mappingFunc a function to map the response object inside an rxjs-map
   */
  queryOne<T, R = T>(
      docType: string,
      uid: string,
      options: QueryOptions = {},
      mappingFunc: ProjectorFunc<TypedApiSearchResponse<T>, TypedApiSearchResponse<R>> = noopProjectorFunc
    ): Observable<TypedDocument<R>> {
    const predicates = [
      Prismic.Predicates.at(`my.${docType}.uid`, uid)
    ];

    return this.query<T, R>(predicates, options, mappingFunc).pipe(
      map(reponse => reponse.results[0])
    );
  }

  /**
   * Checks if a custom token has been provided.
   * If yes, it will be used as our API Ref.
   */
  private prefillWithApiToken() {
    if (this.apiToken) {
      this._api = {
        refs: [
          {
            ref: this.apiToken,
            id: this.apiToken,
            isMasterRef: true,
            label: 'Preview Token',
            scheduledAt: ''
          }
        ]
      } as ResolvedApi;
    }
  }

}
