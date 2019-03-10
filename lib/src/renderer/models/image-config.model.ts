import { Image } from '../../models/image.model';
import { Paragraph } from '../../models/typography.model';

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
