import * as Prismic from 'prismic-javascript';
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi';

let _api: ResolvedApi;
/**
 * Helper to get a reference to the prismic API.
 * If more than one page must be loaded, this avoids redundant calls.
 * 
 * @param prismicUrl The Prismic API URL (v2 only)
 */
async function getApi(prismicUrl: string): Promise<ResolvedApi> {
  if (!_api) {
    _api = await Prismic.getApi(prismicUrl);
  }
  return Promise.resolve(_api);
};

/**
 * Recursively loads all available UIDs for a specific docType
 * until all results in Prismic are returned.
 * 
 * @param prismicUrl The Prismic API URL (v2 only)
 * @param docType The API-name of the document type to fetch
 * @param page (only for internal recursive calls, only call this function with the first two arguments)
 */
export async function getPrismicUids(prismicUrl: string, docType: string, page = 1): Promise<string[]> {
  const uids: string[] = [];
  const api = await getApi(prismicUrl);

  const response = await api.query(Prismic.Predicates.at('document.type', docType), { page, pageSize: 100 });
  uids.push(...response.results.map(result => result.uid));

  if (page < response.total_pages) {
    uids.push(...await getPrismicUids(prismicUrl, docType, ++page));
  }

  return uids;
}
