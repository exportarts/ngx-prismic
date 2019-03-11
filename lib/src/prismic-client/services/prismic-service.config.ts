import { InjectionToken } from '@angular/core';

/**
 * Use this InjectionToken to provide the PrismicServiceConfig object.
 * The value can be provided in the root module as well as in child modules,
 * e.g. when you have a dedicated PrismicModule.
 * 
 * Exmaple:
 * ```ts
 * @NgModule({
 *   declarations: [],
 *   imports: [
 *     CommonModule,
 *     PrismicClientModule
 *   ],
 *   providers: [
 *     {
 *       provide: PrismicServiceConfigProvider,
 *       useValue: {
 *          prismicUrl: 'https://<MY_REPO>.cdn.prismic.io/api/v2'
 *       }
 *     }
 *   ]
 * })
 * export class MyPrismicModule { }
 * ```
 */
export const PrismicServiceConfigProvider = new InjectionToken<PrismicServiceConfig>('Provider for PrismicServiceConfig');

export interface PrismicServiceConfig {
    /**
     * Your repository's API URL.
     * You can find this string at Settings > API & Security > API Endpoint.
     * 
     * Please note that only Prismic API v2 is supported.
     */
    prismicUrl: string;
}
