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
