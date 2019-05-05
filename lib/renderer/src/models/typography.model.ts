import { Span } from './span.model';

interface TextNode {
  text: string;
  spans: Span[];
}

/**
 * @deprecated will be internalized in next major, use Paragraphs instead
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

export type Paragraphs = Paragraph[];

/**
 * @deprecated will be internalized in next major, use Headings1 instead
 */
export interface Heading1 extends TextNode {
  type: 'heading1';
}

/**
 * @deprecated will be internalized in next major, use Headings2 instead
 */
export interface Heading2 extends TextNode {
  type: 'heading2';
}

/**
 * @deprecated will be internalized in next major, use Headings3 instead
 */
export interface Heading3 extends TextNode {
  type: 'heading3';
}

/**
 * @deprecated will be internalized in next major, use Headings4 instead
 */
export interface Heading4 extends TextNode {
  type: 'heading4';
}

/**
 * @deprecated will be internalized in next major, use Headings5 instead
 */
export interface Heading5 extends TextNode {
  type: 'heading5';
}

/**
 * @deprecated will be internalized in next major, use Headings6 instead
 */
export interface Heading6 extends TextNode {
  type: 'heading6';
}

export type Headings1 = Heading1[];
export type Headings2 = Heading2[];
export type Headings3 = Heading3[];
export type Headings4 = Heading4[];
export type Headings5 = Heading5[];
export type Headings6 = Heading6[];

export type Select<T extends string> = {
  type: 'Select',
  value: T;
}
