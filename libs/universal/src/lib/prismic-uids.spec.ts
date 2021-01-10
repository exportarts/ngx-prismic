import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import { getPrismicUids } from './prismic-uids';

describe('Prismic.getApi', () => {
    it('should return a Promise', async () => {
        const promise = Prismic.getApi('https://www.google.com');
        expect(promise).toBeDefined();
        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();
    });

    it('should return a Promise with a resolved api', async () => {
        const api = await Prismic.getApi('https://www.google.com');
        expect(api).toBeDefined();
        expect(api.refs).toBeDefined();
        expect(api.refs[0].isMasterRef).toEqual(true);
    });
});

describe('getPrismicUids', () => {
    it('should return a Promise', async () => {
        const promise = getPrismicUids('https://www.google.com', 'intro');
        expect(promise).toBeDefined();
        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();
    });
    it('should return with a resovled api response', async () => {
        const result = (await getPrismicUids('https://www.google.com', 'intro')) as unknown as Document[];
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].uid).toBeDefined();
        expect(result[0].data).toBeUndefined();
    });
    it('should return with a resovled api response and data', async () => {
        const result = (await getPrismicUids('https://www.google.com', 'intro', true)) as unknown as Document[];
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].uid).toBeDefined();
        expect(result[0].data).toBeDefined();
    });
});
