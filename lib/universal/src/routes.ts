import { getPrismicUids } from './prismic-uids';

/**
 * Defines the relationship between a Prismic custom type
 * and the associated path inside the Angular application.
 */
interface DynamicRouteConfig {
    /**
     * API-name of the Custom Type.
     */
    documentType: string;
    /**
     * This function takes the UID of a Prismic document and
     * must return the absolute path to render this document.
     */
    uidMappingFunc: (uid: string) => string;
}

export interface RouteConfig {
    /**
     * An array of static routes to include.
     * All Routes must be absolute (start with '/').
     */
    staticRoutes: string[],
    prismic: {
        /**
         * Your repository's API URL.
         * You can find this string at Settings > API & Security > API Endpoint.
         * 
         * Please note that only Prismic API v2 is supported.
         */
        apiUrl: string;
        dynamicRoutes: DynamicRouteConfig[];
    };
}

export interface RoutesConfigExtraOptions {
    logFunc?: (message: string) => any;
}

const DEFAULT_ROUTES_CONFIG_EXTRA_OPTIONS: RoutesConfigExtraOptions = {
    logFunc: (message: string) => console.log(`[ngx-prismic] ${message}`)
}

/**
 * Use this function to get all routes inside the Angular application.
 * Routes can be static or dependend on CMS-content from Prismic.
 * 
 * @param config Configuration to resolve and return all routes
 */
export async function getRoutes(config: RouteConfig, options = DEFAULT_ROUTES_CONFIG_EXTRA_OPTIONS): Promise<string[]> {
    options.logFunc('Starting to collect routes\n');

    const routes = [...config.staticRoutes];
    options.logFunc(`Found ${config.staticRoutes.length} static routes`);

    for (const routeConfig of config.prismic.dynamicRoutes) {
        const uids = await getPrismicUids(config.prismic.apiUrl, routeConfig.documentType);
        const mappedRoutes = uids.map(uid => routeConfig.uidMappingFunc(uid));
        routes.push(...mappedRoutes);
        options.logFunc(`Found ${mappedRoutes.length} routes for document type "${routeConfig.documentType}"`);
    }

    options.logFunc(`Found ${routes.length} total routes\n`);
    return Promise.resolve(routes);
};
