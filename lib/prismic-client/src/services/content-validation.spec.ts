import { isValidValue, setDefaultParagraphs, setDefaultImage } from "./content-validation";
import { Paragraphs } from '../models/typography.model';
import { Image } from '../models/image.model';
import { SpanType } from '../models/span.model';

describe('Content Validation', () => {

    describe('isValidValue', () => {
        test('Valid paragraph', () => {
            const value: Paragraphs = [
                {
                    spans: [],
                    type: 'paragraph',
                    text: 'I am valid!'
                }
            ];
            expect(isValidValue(value)).toEqual(true);
        });
        test('Invalid paragraph', () => {
            const value: Paragraphs = [
                {
                    spans: [],
                    type: 'paragraph',
                    text: ''
                }
            ];
            expect(isValidValue(value)).toEqual(false);
        });
        test('Valid image', () => {
            const value: Image = {
                alt: 'alt text',
                copyright: '',
                dimensions: {
                    width: 100,
                    height: 100
                },
                url: 'image.jpg'
            };
            expect(isValidValue(value)).toEqual(true);
        });
        test('Invalid image', () => {
            const value: Image = {
                alt: null,
                copyright: null,
                dimensions: {
                    width: null,
                    height: null
                },
                url: ''
            };
            expect(isValidValue(value)).toEqual(false);
        });
    });

    describe('setDefaultParagraphs', () => {
        test('Should return the original value', () => {
            const original: Paragraphs = [
                {
                    spans: [
                        {
                            start: 0,
                            end: 10,
                            type: SpanType.STRONG
                        }
                    ],
                    type: 'paragraph',
                    text: 'Origninal Paragraph'
                }
            ];
            const fallbackText = 'Some other text';
            expect(setDefaultParagraphs(original, 'paragraph', fallbackText)).toEqual(original);
        });
        test('Should return the fallback value', () => {
            const original: Paragraphs = [
                {
                    spans: [],
                    type: 'paragraph',
                    text: ''
                }
            ];
            const fallbackText = 'Some other text';
            const fallback: Paragraphs = [
                {
                    spans: [],
                    type: 'paragraph',
                    text: fallbackText
                }
            ];
            expect(setDefaultParagraphs(original, 'paragraph', fallbackText)).toEqual(fallback);
        });
    });

    describe('setDefaultImage', () => {
        test('Should return the original value', () => {
            const original: Image = {
                alt: 'alt text',
                copyright: '',
                dimensions: {
                    width: 100,
                    height: 100
                },
                url: 'image.jpg'
            };
            const fallbackUrl = 'some-other-image.png';
            const fallbackAlt = 'My image';
            expect(setDefaultImage(original, fallbackUrl, fallbackAlt)).toEqual(original);
        });
        test('Should return the fallback value', () => {
            const original: Image = {
                alt: null,
                copyright: null,
                dimensions: {
                    width: null,
                    height: null
                },
                url: ''
            };
            const fallbackUrl = 'some-other-image.png';
            const fallbackAlt = 'My image';
            const fallback: Image = {
                alt: fallbackAlt,
                copyright: null,
                dimensions: {
                    width: null,
                    height: null
                },
                url: fallbackUrl
            };
            expect(setDefaultImage(original, fallbackUrl, fallbackAlt)).toEqual(fallback);
        });
    });

});
