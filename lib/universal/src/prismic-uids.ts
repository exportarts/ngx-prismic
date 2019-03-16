import * as Prismic from 'prismic-javascript';
import ResolvedApi, { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';
import { Document } from 'prismic-javascript/d.ts/documents';

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
 * A Prismic Document without the actual data.
 */
export type DocumentMetadata = Pick<Document,
  'id' |
  'uid' |
  'type' |
  'href' |
  'tags' |
  'slugs' |
  'lang' |
  'alternate_languages' |
  'first_publication_date' |
  'last_publication_date'
>;

/**
 * Recursively loads all available UIDs for a specific docType
 * until all results in Prismic are returned.
 * 
 * @param prismicUrl The Prismic API URL (v2 only)
 * @param docType The API-name of the document type to fetch
 * @param page (only for internal recursive calls, only call this function with the first two arguments)
 */
export async function getPrismicUids(prismicUrl: string, docType: string, page = 1): Promise<DocumentMetadata[]> {
  const metaDocuments: DocumentMetadata[] = [];
  const api = await getApi(prismicUrl);

  const options: QueryOptions = {
    page,
    pageSize: 100,
    fetch: null // Don't query document data
  };
  const response = await api.query(Prismic.Predicates.at('document.type', docType), options);
  metaDocuments.push(...response.results.map(result => {
    delete result.data;
    return result as DocumentMetadata;
  }));

  if (page < response.total_pages) {
    metaDocuments.push(...await getPrismicUids(prismicUrl, docType, ++page));
  }

  return metaDocuments;
}
