import { getPrismicUids } from './prismic-uids';
import { RouteConfig, DEFAULT_EXTRA_OPTIONS } from './routes.model';

/**
 * Use this function to get all routes inside the Angular application
 * which dependend on CMS-content from Prismic.
 * 
 * @param config Configuration to resolve and return all routes
 */
export async function getRoutes(config: RouteConfig, options = DEFAULT_EXTRA_OPTIONS): Promise<string[]> {
    options.logFunc('Starting to collect routes\n');

    const routes = [];

    for (const docTypeConfig of config.docTypeConfigs) {
        const uids = await getPrismicUids(config.prismicApiUrl, docTypeConfig.documentType);
        const mappedRoutes = uids.map(uid => docTypeConfig.uidMappingFunc(uid));
        routes.push(...mappedRoutes);
        options.logFunc(`Found ${mappedRoutes.length} routes for document type "${docTypeConfig.documentType}"`);
    }

    options.logFunc(`Found ${routes.length} total routes\n`);
    return Promise.resolve(routes);
};
