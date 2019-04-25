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
 * @param includeData Whether to include the full document data, nut just metadata
 * @param page (only for internal recursive calls, only call this function with the first two/three arguments)
 */
export async function getPrismicUids(prismicUrl: string, docType: string, includeData = false, page = 1): Promise<(DocumentMetadata | Document)[]> {
  const documents: (DocumentMetadata | Document)[] = [];
  const api = await getApi(prismicUrl);

  const options: QueryOptions = {
    page,
    pageSize: 100
  };

  if (!includeData) {
    options.fetch = null; // Don't query document data by default
  }

  const response = await api.query(Prismic.Predicates.at('document.type', docType), options);
  documents.push(...response.results.map(result => {
    if (includeData) {
      return result;
    }

    delete result.data;
    return result as DocumentMetadata;
  }));

  if (page < response.total_pages) {
    documents.push(...await getPrismicUids(prismicUrl, docType, includeData, ++page));
  }

  return documents;
}
