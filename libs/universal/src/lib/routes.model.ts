import { PrismicDocument } from '@prismicio/types';
import { ResolveDocumentIdsConfig } from './prismic-uids';

/**
 * Defines the relationship between a Prismic custom type
 * and the associated path inside the Angular application.
 */
export interface DocTypeConfig {
    /**
     * API-name of the Custom Type.
     */
    documentType: string;
    /**
     * This function takes the UID of a Prismic document and
     * must return the absolute path to render this document.
     *
     * Additionally, the complete document can be used
     * to determine the route.
     */
    uidMappingFunc: (uid: string, meta?: PrismicDocument) => string | string[];
}

export interface RouteConfig {
    /**
     * Your repository name.
     *
     * The part of the URL before `.prismic.io`.
     */
    repositoryName: string;
    docTypeConfigs: DocTypeConfig[];
    /**
     * Only request specific documents that match these IDs.
     *
     * If not provided, all documents of the desired type will be fetched.
     */
    documentIds?: string[];
    /**
     * Set this option to true to have the original Prismic document
     * returned in the PrismicRoute's meta attribute.
     */
    includeDocumentData?: boolean;
    additionalConfig?: ResolveDocumentIdsConfig['additionalConfig'];
}

export interface PrismicRoute {
    /**
     * The mapped route.
     */
    route: string;
    /**
     * Additional metadata.
     */
    doc: PrismicDocument;
}

export interface NgxPrismicExtraOptions {
    logFunc?: (message: string) => any;
}

export const DEFAULT_EXTRA_OPTIONS: NgxPrismicExtraOptions = {
    logFunc: (message: string) => console.log(`[ngx-prismic] ${message}`)
}
