import { encodePredicates, encodeOptions } from './encode';
import { Predicates } from 'prismic-javascript';
import { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';

describe('encodePredicates()', () => {

    test('encode one predicate', () => {
        const predicates = [
            Predicates.at('document.type', 'project')
        ];
        
        const expected = '&q=[%5Bat(document.type%2C%20%22project%22)%5D]';
        expect(encodePredicates(predicates)).toEqual(expected);
    });

    test('encode two predicates', () => {
        const predicates = [
            Predicates.at('document.type', 'project'),
            Predicates.gt('my.project.score', 10)
        ];
        
        const expected = '&q=[%5Bat(document.type%2C%20%22project%22)%5D]&q=[%5Bnumber.gt(my.project.score%2C%2010)%5D]';
        expect(encodePredicates(predicates)).toEqual(expected);
    });
    
});

describe('encodeOptions()', () => {

    test('encode one options', () => {
        const options: QueryOptions = {
            orderings : '[document.first_publication_date]'
        };

        const expected = '&orderings=[document.first_publication_date]';
        expect(encodeOptions(options)).toEqual(expected);
    });

    test('encode multiple options', () => {
        const options: QueryOptions = {
            page: 2,
            pageSize: 5,
            orderings : '[my.blog_post.timestamp desc]'
        };

        const expected = '&page=2&pageSize=5&orderings=[my.blog_post.timestamp desc]';
        expect(encodeOptions(options)).toEqual(expected);
    });

});
