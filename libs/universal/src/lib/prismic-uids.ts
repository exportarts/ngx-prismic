import { BuildQueryURLArgs, createClient, getEndpoint } from '@prismicio/client';
import fetch from 'node-fetch';

/**
 * Recursively loads all available UIDs for a specific docType
 * until all results in Prismic are returned.
 *
 * @param repositoryName The Prismic API URL (v2 only)
 * @param docType The API-name of the document type to fetch
 * @param includeData Whether to include the full document data, nut just metadata
 */
export async function getPrismicUids(repositoryName: string, docType: string, includeData = false) {
  const endpoint = getEndpoint(repositoryName);
  const client = createClient(endpoint, {
    fetch
  });
  const options: Partial<Omit<BuildQueryURLArgs, 'page'>> = {};

  if (!includeData) {
    options.fetch = null; // Don't query document data by default
  }

  return client.getAllByType(docType, options);
}
