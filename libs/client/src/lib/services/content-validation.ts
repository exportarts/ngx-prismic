import { Paragraphs, Paragraph, TextNodeType } from '../models/typography.model';
import { Image } from '../models/image.model';

function isValidImage(value: any): value is Image {
    return value
        && value.hasOwnProperty('url')
        && value.hasOwnProperty('dimensions')
        && value.url.length > 0;
}

function isValidParagraphs(value: any): value is Paragraphs {
    return Array.isArray(value)
        && value.length > 0
        && value.every(item => isValidParagraph(item));
}

function isValidParagraph(value: any): value is Paragraph {
    return value
        && value.hasOwnProperty('text')
        && value.hasOwnProperty('spans')
        && value.hasOwnProperty('type')
        && value.text.length > 0;
}

/**
 * Check if the given content is valid according to the
 * Prismic Types and if a usable value is set.
 * 
 * For example, this means that an Image needs an URL and
 * that a Paragraph needs text which is not an empty string.
 * 
 * @param content the content to test
 */
export function isValidValue(content: Paragraph | Paragraphs | Image): boolean {
    if (!content) {
        return false;
    }

    return isValidImage(content)
        || isValidParagraph(content)
        || isValidParagraphs(content);
}

/**
 * This function takes a Paragraph (or Heading1, Heading2, ...) and sets
 * a fallback value for it. If the given value is not valid, the fallback
 * value will be returned instead.
 * 
 * @param value The original value; will be returned if it is valid
 * @param type Type of the TextNode (heading1, paragraph, ...)
 * @param input The fallback text or paragraph
 */
export function setDefaultParagraphs<T extends Paragraph = Paragraph>(value: T[], type: TextNodeType, input: string | string[] | T | T[]): T[] {
    if (isValidValue(value)) {
        return value;
    }
    return getDefaultParagraphs(type, input);
}

export function getDefaultParagraphs<T extends Paragraph = Paragraph>(type: TextNodeType, input: string | string[] | T | T[]): T[] {
    let paragraphs: Paragraph[];
    if (Array.isArray(input)) {
        if (typeof input[0] === 'string') {
            paragraphs = (input as string[]).map(str => {
                const paragraph: Paragraph = {
                    text: str,
                    spans: [],
                    type
                };
                return paragraph;
            });
        }
        if (typeof input[0] === 'object') {
            paragraphs = input as Paragraphs;
        }
    } else {
        if (typeof input === 'string') {
            paragraphs = [
                {
                    text: input,
                    type,
                    spans: []
                }
            ];
        }
        if (typeof input === 'object') {
            paragraphs = [ input ];
        }
    }
    return paragraphs as T[];
}

/**
 * This function takes an Image and sets and sets a fallback
 * value for it. If the given value is not valid, the fallback
 * value will be returned instead.
 * 
 * @param value The original image
 * @param url Fallback URL
 * @param alt Optional fallback alt-text
 */
export function setDefaultImage(value: Image, url: string, alt = ''): Image {
    if (isValidValue(value)) {
        return value;
    }
    return getDefaultImage(url, alt);
}

export function getDefaultImage(url: string, alt = ''): Image {
    const image: Image = {
        url,
        alt,
        copyright: null,
        dimensions: {
            height: null,
            width: null
        }
    };
    return image;
}
