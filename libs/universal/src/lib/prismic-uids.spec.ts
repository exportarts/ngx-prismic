import { getPrismicUids } from './prismic-uids';

describe('getPrismicUids', () => {
    it('should return a Promise', async () => {
        const promise = getPrismicUids('https://www.google.com', 'intro');
        expect(promise).toBeDefined();
        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();
    });
    it('should return with a resovled api response', async () => {
        const result = (await getPrismicUids('https://www.google.com', 'intro'));
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].uid).toBeDefined();
        expect(result[0].data).toBeUndefined();
    });
    it('should return with a resovled api response and data', async () => {
        const result = (await getPrismicUids('https://www.google.com', 'intro', true));
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].uid).toBeDefined();
        expect(result[0].data).toBeDefined();
    });
});
