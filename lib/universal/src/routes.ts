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
            let resolvedRouteOrRoutes = docTypeConfig.uidMappingFunc(doc.uid, doc);
            if (!Array.isArray(resolvedRouteOrRoutes)) {
                resolvedRouteOrRoutes = [resolvedRouteOrRoutes];
            }

            const resolvedRoutes: PrismicRoute[] = resolvedRouteOrRoutes.map(route => ({
                route,
                meta: doc
            }));

            return resolvedRoutes;
        });
        const flattenedMappedRoutes = flatten(mappedRoutes)
        prismicRoutes.push(...flattenedMappedRoutes);
        options.logFunc(`Found ${mappedRoutes.length} routes for document type "${docTypeConfig.documentType}"`);
    }

    options.logFunc(`Found ${prismicRoutes.length} total routes\n`);
    return Promise.resolve(prismicRoutes);
}

/**
 * Flattens an array up to the specified depth.
 * 
 * Use recursion, decrementing depth by 1 for each level of depth.
 * Use Array.prototype.reduce() and Array.prototype.concat() to merge
 * elements or arrays. Base case, for depth equal to 1 stops recursion.
 * Omit the second argument, depth to flatten only to a depth of 1 (single flatten).
 * 
 * From: https://30secondsofcode.org/#flatten
 */
function flatten(arr, depth = 1) {
    return arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
}
