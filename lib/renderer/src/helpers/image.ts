import { RichText } from 'prismic-dom/dist/prismic-dom.min.js';
import { Paragraph } from '../models/typography.model';
import { Image } from '../models/image.model';

export interface ImageConfig {
    image: Image;
    caption?: Paragraph[];
    /**
     * CSS classes which will be added to the <img> tag.
     * 
     * @example
     * ```html
     * <!-- imgClass: 'img img-avatar' -->
     * <img class="img img-avatar" src="...">
     * ```
     */
    imgClass?: string;
    /**
     * "alt"-text for <img>.
     * 
     * This text is used instead of the alt-text delivered
     * by prismic.
     * 
     * @example
     * ```html
     * <!-- alt: 'image of something' -->
     * <img alt="image of something" src="...">
     * ```
     */
    alt?: string;
    /**
     * "title"-text for <img>.
     * 
     * @example
     * ```html
     * <!-- title: 'this is an image' -->
     * <img title="this is an image" src="...">
     * ```
     */
    title?: string;
}

/**
 * Render an image to HTML.
 * This method will return a `<figure>` if you pass an
 * image caption, otherwise just an `<img>`.
 * 
 * @param config configuration to render this image
 */
export function renderImage(config: ImageConfig): string {
    if (config.alt) {
        config.image.alt = config.alt;
    }

    const imgClass = config.imgClass ? `class="${config.imgClass}"` : '';
    const imgAlt = config.image.alt ? `alt="${config.image.alt}"` : '';
    const imgTitle = config.title ? `title="${config.title}"` : '';
    const imgSrc = `src="${config.image.url}"`;
    const img = `<img ${imgClass} ${imgAlt} ${imgTitle} ${imgSrc}>`;

    if (config.caption) {
        return `
            <figure>
              ${img}
              <figcaption>${RichText.asHtml(config.caption)}</figcaption>
            </figure>
          `;
    }

    return img;
}
