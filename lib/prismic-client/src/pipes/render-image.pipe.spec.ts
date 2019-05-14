import { SpanType } from '../models/span.model';
import { Paragraphs } from '../models/typography.model';
import { RenderImagePipe } from './render-image.pipe';
import { Image } from '../models/image.model';

describe('RenderImagePipe', () => {
    let pipe: RenderImagePipe;
    beforeEach(() => {
      pipe = new RenderImagePipe();
    });

    describe('tranform()', () => {
        test('Simple image', () => {
            const image: Image = {
                url: 'photo.jpg',
                dimensions: {
                    height: 100,
                    width: 100
                },
                alt: null,
                copyright: null
            };

            const rendered = pipe.transform(image);
            expect(rendered).toEqual('<img src="photo.jpg">')
        });

        test('Image with alt', () => {
            const image: Image = {
                url: 'photo.jpg',
                dimensions: {
                    height: 100,
                    width: 100
                },
                alt: 'my photo',
                copyright: null
            };

            const rendered = pipe.transform(image);
            expect(rendered).toEqual('<img alt="my photo" src="photo.jpg">')
        });

        test('Image with title', () => {
            const image: Image = {
                url: 'photo.jpg',
                dimensions: {
                    height: 100,
                    width: 100
                },
                alt: null,
                copyright: null
            };
            const title = 'my photo';

            const rendered = pipe.transform(image, title);
            expect(rendered).toEqual('<img title="my photo" src="photo.jpg">')
        });

        test('Image with alt and title', () => {
            const image: Image = {
                url: 'photo.jpg',
                dimensions: {
                    height: 100,
                    width: 100
                },
                alt: 'alt text',
                copyright: null
            };
            const title = 'my photo';

            const rendered = pipe.transform(image, title);
            expect(rendered).toEqual('<img alt="alt text" title="my photo" src="photo.jpg">')
        });

        test('Image with title and classes', () => {
            const image: Image = {
                url: 'photo.jpg',
                dimensions: {
                    height: 100,
                    width: 100
                },
                alt: null,
                copyright: null
            };
            const title = 'my photo';
            const classes = 'my-image'

            const rendered = pipe.transform(image, title, classes);
            expect(rendered).toEqual('<img class="my-image" title="my photo" src="photo.jpg">')
        });

        test('Image with alt, title and classes', () => {
            const image: Image = {
                url: 'photo.jpg',
                dimensions: {
                    height: 100,
                    width: 100
                },
                alt: 'altalt',
                copyright: null
            };
            const title = 'my photo';
            const classes = 'my-image'

            const rendered = pipe.transform(image, title, classes);
            expect(rendered).toEqual('<img class="my-image" alt="altalt" title="my photo" src="photo.jpg">')
        });

        test('Image with title, classes and caption', () => {
            const image: Image = {
                url: 'photo.jpg',
                dimensions: {
                    height: 100,
                    width: 100
                },
                alt: null,
                copyright: null
            };
            const title = 'my photo';
            const classes = 'my-image'
            const caption: Paragraphs = [
                {
                    text: 'Check out my pic',
                    spans: [],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(image, title, classes, caption);
            expect(rendered).toEqual('<figure><img class="my-image" title="my photo" src="photo.jpg"><figcaption><p>Check out my pic</p></figcaption></figure>')
        });

        test('Image with alt, title, classes and caption', () => {
            const image: Image = {
                url: 'photo.jpg',
                dimensions: {
                    height: 100,
                    width: 100
                },
                alt: 'test',
                copyright: null
            };
            const title = 'my photo';
            const classes = 'my-image'
            const caption: Paragraphs = [
                {
                    text: 'Check out my pic',
                    spans: [],
                    type: 'paragraph'
                }
            ];

            const rendered = pipe.transform(image, title, classes, caption);
            expect(rendered).toEqual('<figure><img class="my-image" alt="test" title="my photo" src="photo.jpg"><figcaption><p>Check out my pic</p></figcaption></figure>')
        });
    });
    
});
