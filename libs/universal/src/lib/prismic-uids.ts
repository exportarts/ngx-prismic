import { BuildQueryURLArgs, createClient, getEndpoint, predicate } from '@prismicio/client';
import fetch from 'node-fetch';

function getClient(repositoryName: string) {
  const endpoint = getEndpoint(repositoryName);
  return createClient(endpoint, {
    fetch
  });
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

/**
 * Fetches prismic documents by their ids.
 *
 * @param repositoryName The Prismic API URL (v2 only)
 * @param docType The API-name of the document type to fetch
 * @param documentIds the technical document ids (not uids) from prismic
 * @param includeData Whether to include the full document data, nut just metadata
 */
export async function resolveDocumentIds(repositoryName: string, docType: string, documentIds: string[], includeData = false) {
  const client = getClient(repositoryName);
  const options: Partial<Omit<BuildQueryURLArgs, 'page'>> = {
    predicates: predicate.at('document.type', docType)
  };

  if (!includeData) {
    options.fetch = null; // Don't query document data by default
  }

  return client.getAllByIDs(documentIds, options);
}
