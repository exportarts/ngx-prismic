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

export function isValidValue(content: Paragraphs | Image): boolean {
    if (!content) {
        return false;
    }

    return isValidImage(content)
        || isValidParagraphs(content);
}

export function setDefaultParagraphs<T extends Paragraph>(value: T[], type: TextNodeType, text: string | string[]): T[] {
    if (isValidValue(value)) {
        return value;
    }
    return getDefaultParagraphs(type, text);
}

function getDefaultParagraphs<T extends Paragraph>(type: TextNodeType, text: string | string[]): T[] {
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

export function setDefaultImage(value: Image, url: string, alt = ''): Image {
    if (isValidValue(value)) {
        return value;
    }
    return getDefaultImage(url, alt);
}

function getDefaultImage(url: string, alt = ''): Image {
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
