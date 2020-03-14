import { Span } from './span.model';

export type TextNodeType = 
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

export interface Paragraph {
  text: string;
  spans: Span[];
  type: TextNodeType;
}

export type Paragraphs = Paragraph[];

/**
 * @deprecated will be internalized in next major, use Headings1 instead
 */
export interface Heading1 extends Paragraph {
  type: 'heading1';
}

/**
 * @deprecated will be internalized in next major, use Headings2 instead
 */
export interface Heading2 extends Paragraph {
  type: 'heading2';
}

/**
 * @deprecated will be internalized in next major, use Headings3 instead
 */
export interface Heading3 extends Paragraph {
  type: 'heading3';
}

/**
 * @deprecated will be internalized in next major, use Headings4 instead
 */
export interface Heading4 extends Paragraph {
  type: 'heading4';
}

/**
 * @deprecated will be internalized in next major, use Headings5 instead
 */
export interface Heading5 extends Paragraph {
  type: 'heading5';
}

/**
 * @deprecated will be internalized in next major, use Headings6 instead
 */
export interface Heading6 extends Paragraph {
  type: 'heading6';
}

export type Headings1 = Heading1[];
export type Headings2 = Heading2[];
export type Headings3 = Heading3[];
export type Headings4 = Heading4[];
export type Headings5 = Heading5[];
export type Headings6 = Heading6[];

/**
 * @deprecated this is a type definition found in prismic api v1
 */
export type SelectV1<T extends string> = {
  type: 'Select',
  value: T;
}
