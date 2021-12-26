import { PrismicDocument } from '@prismicio/types';
import { getPrismicUids, resolveDocumentIds } from './prismic-uids';
import { RouteConfig, DEFAULT_EXTRA_OPTIONS, PrismicRoute } from './routes.model';

/**
 * Loads all documents with the provided doc types from Prismic,
 * maps them with the provided mapping function and returns an array
 * of routes that may be used for prerendering.
 *
 * @param config Configuration to resolve and return all routes
 * @param options Specify optional configuration
 */
export async function getRoutes(config: RouteConfig, options = DEFAULT_EXTRA_OPTIONS): Promise<PrismicRoute[]> {
    options.logFunc('Starting to collect routes\n');
    config.includeDocumentData = config.includeDocumentData || false;

    const prismicRoutes: PrismicRoute[] = [];

    for (const docTypeConfig of config.docTypeConfigs) {
        let documents: PrismicDocument[] = [];
        if (Array.isArray(config.documentIds) && config.documentIds.length) {
          const resolved = await resolveDocumentIds(config.repositoryName, config.documentIds, config.includeDocumentData);
          documents = resolved.filter(doc => doc.type === docTypeConfig.documentType);

          if (documents.length) {
            options.logFunc(`Resolved ${documents.length} document(s) by their ids:`);
            for (const document of documents) {
              options.logFunc(`${document.id} => ${document.uid}`);
            }
          } else {
            options.logFunc(`Did not find any documents of type "${docTypeConfig.documentType}" with the provided ids: ${JSON.stringify(config.documentIds)}`);
          }

        } else {
          documents = await getPrismicUids(config.repositoryName, docTypeConfig.documentType, config.includeDocumentData);
        }

        const mappedRoutes = documents.map(doc => {
            let resolvedRouteOrRoutes = docTypeConfig.uidMappingFunc(doc.uid, doc);
            if (!Array.isArray(resolvedRouteOrRoutes)) {
                resolvedRouteOrRoutes = [resolvedRouteOrRoutes];
            }

            const resolvedRoutes: PrismicRoute[] = resolvedRouteOrRoutes.map(route => ({
                route,
                doc
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
