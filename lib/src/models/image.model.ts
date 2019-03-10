/**
 * The Prismic API returns such object when using
 * the 'Image'-element.
 */
export interface Image {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string;
  copyright: string;
  url: string;
}
