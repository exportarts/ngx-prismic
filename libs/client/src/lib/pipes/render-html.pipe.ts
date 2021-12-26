import { Pipe, PipeTransform } from '@angular/core';
import { asHTML, HTMLFunctionSerializer, HTMLMapSerializer } from '@prismicio/helpers';
import { RichTextField } from '@prismicio/types';

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

  /**
   * Takes Paragraphs and renders them to HTML.
   * It is possible to use a custom serializer function to change rendering
   * of certain elements, for example to add classes to standard tags.
   *
   * @param value paragraph definition to render
   * @param htmlSerializer optional HtmlResolver which modifies the rendering of certain elements
   */
  transform(value: RichTextField, htmlSerializer?: HTMLMapSerializer | HTMLFunctionSerializer): string {
    if (!(Array.isArray(value) && value.length > 0)) {
      return '';
    }
    return asHTML(value, undefined, htmlSerializer);
  }

}
