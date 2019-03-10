import { Injectable } from '@angular/core';
import { ImageConfig } from '../models/image-config.model';
import { Paragraph } from '../../models/typography.model';
import { RichText } from 'prismic-dom/dist/prismic-dom.min.js';

@Injectable({
    providedIn: 'root'
})
export class RendererService {

    /**
     * Render an image to HTML.
     * This method will return a `<figure>` if you pass an
     * image caption, otherwise just an `<img>`.
     * 
     * @param config configuration to render this image
     */
    static renderImage(config: ImageConfig): string {
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
              <figcaption>${RendererService.renderText(config.caption)}</figcaption>
            </figure>
          `;
        }

        return img;
    }

    /**
     * Render a list of paragraphs (e.g. from a Rich Text Section)
     * to HTML.
     * 
     * @param paragraphs a list of paragraphs to transform to HTML
     */
    static renderText(paragraphs: Paragraph[]): string {
        return RichText.asHtml(paragraphs);
    }
}
