import { Pipe, PipeTransform } from '@angular/core';
import { RichText } from 'prismic-dom/dist/prismic-dom.min.js';

// Todo: Find better solution for importing other sub-packages
import { Paragraphs } from 'ngx-prismic/renderer';

/**
 * This pipe is used to render an array of Prismic Paragraphs
 * to HTML.
 * 
 * @example
 * <!-- text is an array of paragraphs -->
 * <ng-container [innerHTML]="doc.data.text | renderHtml"></ng-container>
 */
@Pipe({
  name: 'renderHtml'
})
export class RenderHtmlPipe implements PipeTransform {

  transform(value: Paragraphs): string {
    return RichText.asHtml(value);
  }

}
