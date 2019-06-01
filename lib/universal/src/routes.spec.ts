import { RouteConfig, NgxPrismicExtraOptions } from "./routes.model";
import { getRoutes } from './routes';

describe('getRoutes', () => {
    let config: RouteConfig;
    let options: NgxPrismicExtraOptions;
    beforeEach(() => {
        config = {
            prismicApiUrl: 'https://www.google.com',
            docTypeConfigs: [
                {
                    documentType: 'intro',
                    uidMappingFunc: uid => `/home/${uid}`
                }
            ]
        };
        options = {
            logFunc: message => undefined
        };
    });

    it('should return a promise', async () => {
        const promise = getRoutes(config, options);
        expect(promise).toBeDefined();
        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();
    });

    it('should return a promise with resolved routes', async () => {
        const routes = await getRoutes(config, options);
        expect(routes).toBeDefined();
        expect(routes.length).toBeGreaterThan(0);
        expect(routes[0].route.includes('/home/')).toEqual(true);
    });

    it('should only contain metadata by default', async () => {
        const routes = await getRoutes(config, options);
        expect(routes).toBeDefined();
        expect(routes.length).toBeGreaterThan(0);
        expect((routes[0].meta as any).data).toBeUndefined();
    });

    it('should contain the whole document', async () => {
        config.includeDocumentData = true;

        const routes = await getRoutes(config, options);
        expect(routes).toBeDefined();
        expect(routes.length).toBeGreaterThan(0);
        expect((routes[0].meta as any).data).toBeDefined();
    });
});
