import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse';
import { Document } from 'prismic-javascript/d.ts/documents';

export interface LinkedDocument {
  id: string;
  tags: string[];
  type: string;
  slug: string;
  lang: string;
}

export interface PrismicPageOptions {
  page: number;
  pageSize: number;
}

export interface TypedDocument<T> extends Document {
  data: T;
  linked_documents: LinkedDocument[];
}

export interface TypedApiSearchResponse<T> extends ApiSearchResponse {
  results: TypedDocument<T>[];
  license: string;
  version: string;
}
