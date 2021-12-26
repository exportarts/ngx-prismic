import { HTMLFunctionSerializer, HTMLMapSerializer } from '@prismicio/helpers';
import { RichTextField, RichTextNodeType } from '@prismicio/types';
import { RenderHtmlPipe } from './render-html.pipe';

describe('RenderHtmlPipe', () => {
    let pipe: RenderHtmlPipe;
    beforeEach(() => {
      pipe = new RenderHtmlPipe();
    });

    describe('Without Resolver', () => {
        test('Empty paragraphs', () => {
            expect(pipe.transform([])).toEqual('');
            expect(pipe.transform(undefined)).toEqual('');
            expect(pipe.transform(null)).toEqual('');
            // @ts-ignore
            expect(pipe.transform()).toEqual('');
        });

        test('Simple paragraph without formatting', () => {
            const paragraphs: RichTextField = [
                {
                    text: 'This is a simple paragraph',
                    spans: [],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p>This is a simple paragraph</p>');
        });

        test('Two paragraphs without formatting', () => {
            const paragraphs: RichTextField = [
                {
                    text: 'Part 1',
                    spans: [],
                    type: 'paragraph'
                },
                {
                    text: 'Part 2',
                    spans: [],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p>Part 1</p><p>Part 2</p>');
        });

        test('Paragraph with formatting', () => {
            const paragraphs: RichTextField = [
                {
                    text: 'Bold Normal',
                    spans: [
                        {
                            start: 0,
                            end: 4,
                            type: RichTextNodeType.strong
                        }
                    ],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p><strong>Bold</strong> Normal</p>');
        });

        test('Paragraphs with multiple formatting', () => {
            const paragraphs: RichTextField = [
                {
                    text: 'Bold Normal',
                    spans: [
                        {
                            start: 0,
                            end: 4,
                            type: RichTextNodeType.strong
                        }
                    ],
                    type: 'paragraph'
                },
                {
                    text: 'Italic Normal',
                    spans: [
                        {
                            start: 0,
                            end: 6,
                            type: RichTextNodeType.em
                        }
                    ],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p><strong>Bold</strong> Normal</p><p><em>Italic</em> Normal</p>');
        });

        test('Paragraph with link', () => {
            const paragraphs: RichTextField = [
                {
                    text: 'Link to Google',
                    spans: [
                        {
                            start: 0,
                            end: 4,
                            type: RichTextNodeType.hyperlink,
                            data: {
                                link_type: 'Web',
                                url: 'https://google.com',
                                target: '_blank'
                            }
                        }
                    ],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p><a href="https://google.com" target="_blank" rel="noopener nofereffer">Link</a> to Google</p>');
        });

        test('Paragraph with link and target blank', () => {
            const paragraphs: RichTextField = [
                {
                    text: 'Link to Google',
                    spans: [
                        {
                            start: 0,
                            end: 4,
                            type: RichTextNodeType.hyperlink,
                            data: {
                                link_type: 'Web',
                                url: 'https://google.com',
                                target: '_blank'
                            }
                        }
                    ],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p><a href="https://google.com" target="_blank" rel="noopener noreferrer">Link</a> to Google</p>');
        });
    });

    describe('With Resolver', () => {
        test('Should override everything', () => {
            const paragraphs: RichTextField = [
                {
                    text: 'This is a simple paragraph',
                    spans: [
                        {
                            start: 0,
                            end: 10,
                            type: RichTextNodeType.em
                        }
                    ],
                    type: 'paragraph'
                }
            ];
            const serializer: HTMLFunctionSerializer = (type, element, content, children) => {
                return 'static content';
            }

            const rendered = pipe.transform(paragraphs, serializer);
            expect(rendered).toEqual('static content');
        });

        test('Should override certain spans', () => {
            const paragraphs: RichTextField = [
                {
                    text: 'This is a simple paragraph',
                    spans: [
                        {
                            start: 0,
                            end: 7,
                            type: RichTextNodeType.em
                        }
                    ],
                    type: 'paragraph'
                }
            ];
            const serializer: HTMLMapSerializer = {
              em: ({ children }) => `<span>${children}</span>`
            }

            const rendered = pipe.transform(paragraphs, serializer);
            expect(rendered).toEqual('<p><span>This is</span> a simple paragraph</p>');
        });
    })

});
