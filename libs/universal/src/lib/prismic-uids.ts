import { BuildQueryURLArgs, Client, createClient, getEndpoint } from '@prismicio/client';

let _client: Client;
function getClient(repository: string) {
  if (!_client) {
    const endpoint = getEndpoint(repository);
    _client = createClient(endpoint);
  }
  return _client;
}

/**
 * Recursively loads all available UIDs for a specific docType
 * until all results in Prismic are returned.
 *
 * @param repositoryName The Prismic API URL (v2 only)
 * @param docType The API-name of the document type to fetch
 * @param includeData Whether to include the full document data, nut just metadata
 */
export async function getPrismicUids(repositoryName: string, docType: string, includeData = false) {
  const client = getClient(repositoryName);
  const options: Partial<Omit<BuildQueryURLArgs, 'page'>> = {};

  if (!includeData) {
    options.fetch = null; // Don't query document data by default
  }

  return client.getAllByType(docType, options);
}
