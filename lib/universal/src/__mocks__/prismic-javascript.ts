'use strict';

import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi';
import { Predicates } from 'prismic-javascript';
import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse';

const prismicJavascript: any = jest.genMockFromModule('prismic-javascript');

function getApi(url): Promise<Partial<ResolvedApi>> {
    const resolvedApi: Partial<ResolvedApi> = {
        "refs": [
            {
                "id": "master",
                "ref": "XNx5UhAAAIEEKH26",
                "label": "Master",
                "isMasterRef": true,
                scheduledAt: null
            }
        ],
        "bookmarks": {},
        "types": {
            "select_issue_example": "Select Issue Example"
        },
        "tags": [],
        "experiments": {
            drafts: [],
            running: [],
            current: null,
            refFromCookie: null
        },
        query: () => {
            // any because alternate_languages type is not consistent with what the API returns
            const mockResponse: any = {
                next_page: null,
                prev_page: null,
                page: 1,
                total_pages: 2,
                results: [
                    {
                        alternate_languages: [
                            {
                                id: 'XOlUGBAAAHc4IaRw',
                                uid: 'home',
                                type: 'intro',
                                lang: 'de-de'
                            }
                        ],
                        data: {},
                        first_publication_date: new Date().toISOString(),
                        last_publication_date: new Date().toISOString(),
                        href: 'https://google.com',
                        id: 'hiuads7623ohdas',
                        uid: 'home',
                        lang: 'en-gb',
                        slugs: [],
                        tags: [],
                        type: 'intro'
                    }
                ]
            };
            return Promise.resolve(mockResponse);
        }
    };
    return Promise.resolve(resolvedApi);
}

prismicJavascript.getApi = getApi;

// Keep Predicates the way they are
prismicJavascript.Predicates = Predicates;

module.exports = prismicJavascript;
