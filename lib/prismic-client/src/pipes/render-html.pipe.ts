import { Pipe, PipeTransform } from '@angular/core';
import { RichText } from 'prismic-dom/dist/prismic-dom.min.js';
import { Paragraphs } from '../models/typography.model';

/**
 * A function which is used inside prismic-dom to render HTML.
 * The types of the arguments are highly dynamic and depend on the
 * content, therefore currently no types are provided.
 * 
 * It is best practice to override specific elements depending on the type.
 * For all other elements, returning `null` keeps the default rendering
 * behaviour.
 * 
 * More information and examples can be found here:
 * https://prismic.io/docs/javascript/beyond-the-api/html-serializer
 * 
 * @param type The type of the current element (for example 'paragraph', 'span', 'em', 'hyperlink', ...)
 * @param element The current element (for example a Paragraph, a Span, ...)
 * @param content The content of the current element (for example Paragraph.text)
 * @param children Child elements of the current elements (for example Paragraph -> Span[])
 * 
 */
export type HtmlSerializer = (type: string, element: any, content: any, children: any[]) => string;

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
  transform(value: Paragraphs, htmlSerializer?: HtmlSerializer): string {
    return RichText.asHtml(value, undefined, htmlSerializer);
  }

}
