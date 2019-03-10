/**
 * A prismic.io styling span is described by
 * the starting and end point in the target string,
 * its type and optionally data.
 */
export interface Span {
  start: number;
  end: number;
  type: SpanType;
  data?: SpanDataLinkWeb;
}

export enum SpanType {
  HYPERLINK = 'hyperlink',
  EM = 'em',
  STRONG = 'strong'
}

/**
 * Data for the {@link SpanType.HYPERLINK} tag type.
 */
export interface SpanDataLinkWeb {
  link_type: 'Web';
  url: string;
  target?: string;
}

/**
 * Describes the type of a HTML tag.
 * 
 * @example
 * ```html
 * <!-- This is an opening tag -->
 * <strong>
 * <!-- This is a closing tag -->
 * </strong>
 * <!-- Both -->
 * <strong></strong>
 * ```
 */
export enum TagType {
  OPENING,
  CLOSING,
  BOTH
}
