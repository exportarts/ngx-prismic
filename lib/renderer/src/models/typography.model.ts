import { Span } from './span.model';

interface TextNode {
  text: string;
  spans: Span[];
}

/**
 * The Prismic API returns an array of paragraphs when using
 * e.g. the 'Title'- or 'Rich Text'-elements.
 */
export interface Paragraph extends TextNode {
  type:
    | 'paragraph'
    | 'preformatted'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'heading6'
    | 'o-list-item'
    | 'list-item';
}

export interface Heading1 extends TextNode {
  type: 'heading1';
}

export interface Heading2 extends TextNode {
  type: 'heading2';
}

export interface Heading3 extends TextNode {
  type: 'heading3';
}

export interface Heading4 extends TextNode {
  type: 'heading4';
}

export interface Heading5 extends TextNode {
  type: 'heading5';
}

export interface Heading6 extends TextNode {
  type: 'heading6';
}

export type Select<T extends string> = {
  type: 'Select',
  value: T;
}
