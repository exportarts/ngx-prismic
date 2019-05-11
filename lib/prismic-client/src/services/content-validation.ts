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
        && value[0]
        && value[0].hasOwnProperty('text')
        && value[0].hasOwnProperty('spans')
        && value[0].hasOwnProperty('type')
        && value[0].text.length > 0;
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
export function isValidValue(content: Paragraphs | Image): boolean {
    if (!content) {
        return false;
    }

    return isValidImage(content)
        || isValidParagraphs(content);
}

/**
 * This function takes a Paragraph (or Heading1, Heading2, ...) and sets
 * a fallback value for it. If the given value is not valid, the fallback
 * value will be returned instead.
 * 
 * @param value The original value; will be returned if it is valid
 * @param type Type of the TextNode (heading1, paragraph, ...)
 * @param text The fallback text
 */
export function setDefaultParagraphs<T extends Paragraph>(value: T[], type: TextNodeType, text: string | string[]): T[] {
    if (isValidValue(value)) {
        return value;
    }
    return getDefaultParagraphs(type, text);
}

export function getDefaultParagraphs<T extends Paragraph>(type: TextNodeType, text: string | string[]): T[] {
    if (!Array.isArray(text)) {
        text = [text];
    }
    return text.map(line => {
        const paragraph: Paragraph = {
            spans: [],
            type: type,
            text: line
        };
        return paragraph as T;
    });
};

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
