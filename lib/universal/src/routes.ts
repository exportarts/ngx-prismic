import { getPrismicUids } from './prismic-uids';
import { RouteConfig, DEFAULT_EXTRA_OPTIONS, PrismicRoute } from './routes.model';

/**
 * Use this function to get all routes inside the Angular application
 * which dependend on CMS-content from Prismic.
 * 
 * @param config Configuration to resolve and return all routes
 */
export async function getRoutes(config: RouteConfig, options = DEFAULT_EXTRA_OPTIONS): Promise<PrismicRoute[]> {
    options.logFunc('Starting to collect routes\n');
    config.includeDocumentData = config.includeDocumentData || false;

    const prismicRoutes: PrismicRoute[] = [];

    for (const docTypeConfig of config.docTypeConfigs) {
        const metaDocuments = await getPrismicUids(config.prismicApiUrl, docTypeConfig.documentType, config.includeDocumentData);
        const mappedRoutes = metaDocuments.map(doc => {
            const prismicRoute: PrismicRoute = {
                route: docTypeConfig.uidMappingFunc(doc.uid, doc),
                meta: doc
            };
            return prismicRoute;
        });
        prismicRoutes.push(...mappedRoutes);
        options.logFunc(`Found ${mappedRoutes.length} routes for document type "${docTypeConfig.documentType}"`);
    }

    options.logFunc(`Found ${prismicRoutes.length} total routes\n`);
    return Promise.resolve(prismicRoutes);
};
