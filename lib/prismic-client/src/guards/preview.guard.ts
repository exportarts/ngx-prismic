import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as Prismic from 'prismic-javascript';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PrismicServiceConfig, PrismicServiceConfigProvider, TypedDocument } from '../public_api';

/**
 * This function takes a `TypedDocument` and must return the
 * absolute path to navigate to.
 */
export type LinkResolver = (doc: TypedDocument<any>) => string;

/**
 * Injection token to provide a link resolver function.
 * 
 * This could be done based on doc type and uid.
 */
export const LINK_RESOLVER = new InjectionToken<LinkResolver>('LINK_RESOLVER');

/**
 * Injection token to provide a custom fallback route for link resolving.
 * Default is `/`.
 */
export const LINK_RESOLVER_DEFAULT_ROUTE = new InjectionToken<string>('LINK_RESOLVER_DEFAULT_ROUTE');

/**
 * Injection token to provide the URL for the link resolver.
 * 
 * This value must match the setting in your Prismic Repo.
 */
export const LINK_RESOLVER_URL = new InjectionToken<string>('LINK_RESOLVER_URL');

/**
 * A Guard to easily enable redirects for Prismic Previews.
 * You must provide `LINK_RESOLVER` and `LINK_RESOLVER_URL`.
 * 
 * When a preview-token is present, this guard automatically
 * redirects based on the provided `LINK_RESOLVER`.
 * 
 * If no token is present, the guard does nothing.
 * 
 * Compiler-Flags:
 * - @dynamic (Allow lambda functions)
 */
@Injectable({
  providedIn: 'root'
})
export class PreviewGuard implements CanActivateChild {

  /**
   * Prismic supplies the preview token in a query param named `token`.
   */
  private readonly QUERY_PARAM_KEY = 'token';

  constructor(
    private readonly router: Router,
    @Inject(PrismicServiceConfigProvider)
    private readonly config: PrismicServiceConfig,
    @Inject(LINK_RESOLVER)
    private readonly linkResolver: LinkResolver,
    @Inject(LINK_RESOLVER_URL)
    private readonly linkResolverUrl: string,
    @Inject(LINK_RESOLVER_DEFAULT_ROUTE)
    @Optional()
    private readonly defaultRoute = '/'
  ) { }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<UrlTree> {
    if (state.url.startsWith(this.linkResolverUrl)) {
      const params = next.queryParamMap;
      if (!params.has(this.QUERY_PARAM_KEY)) {
        const tree = this.router.parseUrl(this.defaultRoute);
        return tree;
      }
      
      const token = params.get(this.QUERY_PARAM_KEY);
      const $prismicApi = from(Prismic.getApi(this.config.prismicUrl));
      return $prismicApi.pipe(
        switchMap(api => api.previewSession(token, this.linkResolver, this.defaultRoute)),
        map(url => this.router.parseUrl(url))
      );
    }

    return true;
  }

}
