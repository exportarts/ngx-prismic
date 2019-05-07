import { Pipe, PipeTransform } from '@angular/core';
import { RichText } from 'prismic-dom/dist/prismic-dom.min.js';
import { Paragraphs } from '../../../renderer/src/models/typography.model';

/**
 * This pipe is used to render an array of Prismic Paragraphs
 * to HTML.
 * 
 * @example
 * <!-- text is an array of paragraphs -->
 * <div [innerHTML]="doc.data.text | renderHtml"></div>
 */
@Pipe({
  name: 'renderHtml'
})
export class RenderHtmlPipe implements PipeTransform {

  transform(value: Paragraphs): string {
    return RichText.asHtml(value);
  }

}