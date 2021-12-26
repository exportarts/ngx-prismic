import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Client, createClient, getEndpoint } from '@prismicio/client';
import { LinkResolverFunction } from '@prismicio/helpers';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Name of your prismic repository.
 */
export const REPOSITORY_NAME = new InjectionToken<string>('REPOSITORY_NAME');

/**
 * Injection token to provide a link resolver function.
 *
 * This could be done based on doc type and uid.
 */
export const LINK_RESOLVER = new InjectionToken<LinkResolverFunction>('LINK_RESOLVER');

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

  private readonly client: Client;

  constructor(
    private readonly router: Router,
    @Inject(REPOSITORY_NAME)
    private readonly repoName: string,
    @Inject(LINK_RESOLVER)
    private readonly linkResolver: LinkResolverFunction,
    @Inject(LINK_RESOLVER_URL)
    private readonly linkResolverUrl: string,
    @Inject(LINK_RESOLVER_DEFAULT_ROUTE)
    @Optional()
    private readonly defaultRoute = '/'
  ) {
    const endpoint = getEndpoint(this.repoName);
    this.client = createClient(endpoint);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<UrlTree> {
    if (state.url.startsWith(this.linkResolverUrl)) {
      const params = next.queryParamMap;
      if (!params.has(this.QUERY_PARAM_KEY)) {
        return this.router.parseUrl(this.defaultRoute);
      }

      const previewToken = params.get(this.QUERY_PARAM_KEY);
      const resolvedUrl = from(this.client.resolvePreviewURL({
        previewToken,
        linkResolver: this.linkResolver,
        defaultURL: this.defaultRoute
      }));
      return resolvedUrl.pipe(
        map(url => this.router.parseUrl(url))
      );
    }

    return true;
  }

}
