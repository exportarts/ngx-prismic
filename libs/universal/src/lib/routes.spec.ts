import { RouteConfig, NgxPrismicExtraOptions } from "./routes.model";
import { getRoutes } from './routes';

describe('getRoutes', () => {
    let config: RouteConfig;
    let options: NgxPrismicExtraOptions;
    beforeEach(() => {
        config = {
            repositoryName: 'https://www.google.com',
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
        expect(routes.length).toEqual(2);
        expect(routes[0].route.includes('/home/')).toEqual(true);
        expect(routes[0].route.includes('english')).toEqual(true);
        expect(routes[1].route.includes('english')).toEqual(true);
    });

    it('should be able to process an array with one route', async () => {
        config.docTypeConfigs[0].uidMappingFunc = (uid, meta) => {
            return [`/mapped/${uid}`];
        };
        const routes = await getRoutes(config, options);
        expect(routes).toBeDefined();
        expect(routes.length).toEqual(2);
        expect(routes[0].route.includes('/mapped/')).toEqual(true);
        expect(routes[0].route.includes('english')).toEqual(true);
        expect(routes[1].route.includes('english')).toEqual(true);
    });

    it('should be able to handle 0 mapped routes', async () => {
        config.docTypeConfigs[0].uidMappingFunc = (uid, meta) => [];
        const routes = await getRoutes(config, options);
        expect(routes).toBeDefined();
        expect(routes.length).toEqual(0);
    });

    it('should only contain metadata by default', async () => {
        const routes = await getRoutes(config, options);
        expect(routes).toBeDefined();
        expect(routes.length).toEqual(2);
        expect((routes[0].doc as any).data).toBeUndefined();
        expect(routes[0].route.includes('english')).toEqual(true);
        expect(routes[1].route.includes('english')).toEqual(true);
    });

    it('should contain the whole document', async () => {
        config.includeDocumentData = true;

        const routes = await getRoutes(config, options);
        expect(routes).toBeDefined();
        expect(routes.length).toEqual(2);
        expect((routes[0].doc as any).data).toBeDefined();
        expect(routes[0].route.includes('english')).toEqual(true);
        expect(routes[1].route.includes('english')).toEqual(true);
    });

    it('should only be able to return multiple routes with mapper function', async () => {
        config.docTypeConfigs[0].uidMappingFunc = (uid, meta) => {
            const uids = [uid];
            (meta.alternate_languages as any).forEach(al => uids.push(al.uid))
            return uids.map(_uid => `/myroute/${_uid}`);
        };

        const routes = await getRoutes(config, options);
        expect(routes).toBeDefined();
        expect(routes.length).toEqual(4);
        expect(routes[0].route.includes('/myroute/')).toEqual(true);
        expect(routes[0].route.includes('english')).toEqual(true);
        expect(routes[1].route.includes('/myroute/')).toEqual(true);
        expect(routes[1].route.includes('german')).toEqual(true);
        expect(routes[2].route.includes('/myroute/')).toEqual(true);
        expect(routes[2].route.includes('english')).toEqual(true);
        expect(routes[3].route.includes('/myroute/')).toEqual(true);
        expect(routes[3].route.includes('german')).toEqual(true);
    });
});
