import { Pipe, PipeTransform } from '@angular/core';
import { RichText } from 'prismic-dom';
import { Image } from '../models/image.model';
import { Paragraphs } from '../models/typography.model';

/**
 * This pipe is used to render a Prismic Image to HTML.
 * 
 * @example
 * <ng-container [innerHTML]="doc.image | renderImage : 'my extra classes'"></ng-container>
 */
@Pipe({
    name: 'renderImage'
})
export class RenderImagePipe implements PipeTransform {

    /**
     * Renders an image object returned from Prismic to HTML.
     * 
     * @param image image object returned from Prismic
     * @param imgTitle optional title for the image
     * @param imgClasses optional classes for the image
     * @param caption optional <figcaption>
     */
    transform(image: Image, imgTitle?: string, imgClasses?: string, caption?: Paragraphs): string {
        const classes = imgClasses ? ` class="${imgClasses}"` : '';
        const alt = image.alt ? ` alt="${image.alt}"` : '';
        const title = imgTitle ? ` title="${imgTitle}"` : '';
        const src = ` src="${image.url}"`;
        const img = `<img${classes}${alt}${title}${src}>`;

        if (caption) {
            return `<figure>${img}<figcaption>${RichText.asHtml(caption)}</figcaption></figure>`;
        }

        return img;
    }

}
