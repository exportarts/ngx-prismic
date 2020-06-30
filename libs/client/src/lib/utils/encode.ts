import { QueryOptions } from 'prismic-javascript/types/ResolvedApi';

/**
 * Transform an array of Prismic Predicates to URL-ready
 * query parameters.
 * 
 * It is convenient to generate the predicates with the official
 * `prismic-javascript` library.
 * 
 * @param predicates an array of predicates generated with `prismic-javascript`
 */
export function encodePredicates(predicates: string[]): string {
    return predicates.map(p => `&q=[${encodeURIComponent(p)}]`).join('');
}

/**
 * Transforms a queryOptions-object to concatenated query-parameters
 * to be used as past of an URL.
 *
 * @param options the query options
 */
export function encodeOptions(options: QueryOptions): string {
    return Object.keys(options).map(key => {
        let value = options[key];
        if (Array.isArray(value)) {
            value = value.join(',');
        }
        return `&${key}=${value}`;
    }).join('');
}
