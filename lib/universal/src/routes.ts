import { getPrismicUids } from './prismic-uids';
import { DEFAULT_EXTRA_OPTIONS } from './prerender.model';
import { RouteConfig } from './routes.model';

/**
 * Use this function to get all routes inside the Angular application.
 * Routes can be static or dependend on CMS-content from Prismic.
 * 
 * @param config Configuration to resolve and return all routes
 */
export async function getRoutes(config: RouteConfig, options = DEFAULT_EXTRA_OPTIONS): Promise<string[]> {
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
