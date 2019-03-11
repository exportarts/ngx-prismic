import { RouteConfig } from './routes';

export interface PrerenderConfig {
    routeConfig: RouteConfig;
    /**
     * Path to the built browser-app relative to `./dist/`
     */
    browserFolder: string;
    /**
     * You should pass this option as `require('./dist/server/main')`
     * to directly require the compiled AppServerModule.
     */
    serverBuild: {
        AppServerModuleNgFactory: any;
        LAZY_MODULE_MAP: any;
    }
    extras?: NgxPrismicExtraOptions;
}

export interface NgxPrismicExtraOptions {
    logFunc?: (message: string) => any;
}

export const DEFAULT_EXTRA_OPTIONS: NgxPrismicExtraOptions = {
    logFunc: (message: string) => console.log(`[ngx-prismic] ${message}`)
}
