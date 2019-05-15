import { SpanType } from '../models/span.model';
import { Paragraphs } from '../models/typography.model';
import { RenderHtmlPipe, HtmlSerializer } from './render-html.pipe';

describe('RenderHtmlPipe', () => {
    let pipe: RenderHtmlPipe;
    beforeEach(() => {
      pipe = new RenderHtmlPipe();
    });

    describe('Without Resolver', () => {
        test('Simple paragraph without formatting', () => {
            const paragraphs: Paragraphs = [
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
            const paragraphs: Paragraphs = [
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
            const paragraphs: Paragraphs = [
                {
                    text: 'Bold Normal',
                    spans: [
                        {
                            start: 0,
                            end: 4,
                            type: SpanType.STRONG
                        }
                    ],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p><strong>Bold</strong> Normal</p>');
        });

        test('Paragraphs with multiple formatting', () => {
            const paragraphs: Paragraphs = [
                {
                    text: 'Bold Normal',
                    spans: [
                        {
                            start: 0,
                            end: 4,
                            type: SpanType.STRONG
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
                            type: SpanType.EM
                        }
                    ],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p><strong>Bold</strong> Normal</p><p><em>Italic</em> Normal</p>');
        });

        test('Paragraph with link', () => {
            const paragraphs: Paragraphs = [
                {
                    text: 'Link to Google',
                    spans: [
                        {
                            start: 0,
                            end: 4,
                            type: SpanType.HYPERLINK,
                            data: {
                                link_type: 'Web',
                                url: 'https://google.com'
                            }
                        }
                    ],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(paragraphs);
            expect(rendered).toEqual('<p><a  href="https://google.com">Link</a> to Google</p>');
        });

        test('Paragraph with link and target blank', () => {
            const paragraphs: Paragraphs = [
                {
                    text: 'Link to Google',
                    spans: [
                        {
                            start: 0,
                            end: 4,
                            type: SpanType.HYPERLINK,
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
            expect(rendered).toEqual('<p><a target="_blank" rel="noopener" href="https://google.com">Link</a> to Google</p>');
        });
    });

    describe('With Resolver', () => {
        test('Should override everything', () => {
            const paragraphs: Paragraphs = [
                {
                    text: 'This is a simple paragraph',
                    spans: [
                        {
                            start: 0,
                            end: 10,
                            type: SpanType.EM
                        }
                    ],
                    type: 'paragraph'
                }
            ];
            const serializer: HtmlSerializer = (type, element, content, children) => {
                return 'static content';
            }

            const rendered = pipe.transform(paragraphs, serializer);
            expect(rendered).toEqual('static content');
        });

        test('Should override certain spans', () => {
            const paragraphs: Paragraphs = [
                {
                    text: 'This is a simple paragraph',
                    spans: [
                        {
                            start: 0,
                            end: 7,
                            type: SpanType.EM
                        }
                    ],
                    type: 'paragraph'
                }
            ];
            const serializer: HtmlSerializer = (type, element, content, children) => {
                switch (type) {
                    case 'em': return `<span>${content}</span>`;
                }
            }

            const rendered = pipe.transform(paragraphs, serializer);
            expect(rendered).toEqual('<p><span>This is</span> a simple paragraph</p>');
        });
    })
    
});
