import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import { Document } from 'prismic-javascript/types/documents';
import { ContentRelationship } from './link.model';

export interface AlternateLanguage {
  id: string;
  uid: string;
  type: string;
  lang: string;
}

export interface PrismicPageOptions {
  page: number;
  pageSize: number;
}

export interface TypedDocument<T> extends Omit<Document, 'alternate_languages'> {
  data: T;
  linked_documents: ContentRelationship[];
  alternate_languages: AlternateLanguage[];
}

export interface TypedApiSearchResponse<T> extends Omit<ApiSearchResponse, 'results'> {
  results: TypedDocument<T>[];
  license: string;
  version: string;
}
