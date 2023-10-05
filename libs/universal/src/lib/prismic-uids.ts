import {BuildQueryURLArgs, createClient, getRepositoryEndpoint} from '@prismicio/client';
import fetch from 'node-fetch';

function getClient(repositoryName: string) {
  const endpoint = getRepositoryEndpoint(repositoryName);
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
 * @param additionalConfig Additional options to query the api
 */
export async function getPrismicUids(
  repositoryName: string,
  docType: string,
  includeData = false,
  additionalConfig: AllowedBuildQueryURLArgs = {}
) {
  const client = getClient(repositoryName);
  const options: Partial<Omit<BuildQueryURLArgs, 'page'>> = additionalConfig;

  if (!includeData) {
    options.fetch = null; // Don't query document data by default
  }

  return client.getAllByType(docType, options);
}

type AllowedBuildQueryURLArgs = Partial<Omit<BuildQueryURLArgs, 'page'>>;

export interface ResolveDocumentIdsConfig {
  /**
   * The Prismic API URL (v2 only)
   */
  repositoryName: string;
  /**
   * The technical document ids (not uids) from prismic
   */
  documentIds: string[];
  /**
   * Whether to include the full document data, nut just metadata
   */
  includeDocumentData?: boolean;
  additionalConfig?: AllowedBuildQueryURLArgs;
}

/**
 * Fetches prismic documents by their ids.
 */
export async function resolveDocumentIds(config: ResolveDocumentIdsConfig) {
  const client = getClient(config.repositoryName);
  const options: AllowedBuildQueryURLArgs = config.additionalConfig || {};

  if (!config.includeDocumentData) {
    options.fetch = null; // Don't query document data by default
  }

  return client.getAllByIDs(config.documentIds, options);
}
