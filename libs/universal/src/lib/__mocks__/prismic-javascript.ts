'use strict';

import ResolvedApi from 'prismic-javascript/types/ResolvedApi';
import Prismic from 'prismic-javascript';

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
                                uid: 'home-in-german',
                                type: 'intro',
                                lang: 'de-de'
                            }
                        ],
                        data: {},
                        first_publication_date: new Date().toISOString(),
                        last_publication_date: new Date().toISOString(),
                        href: 'https://google.com',
                        id: 'hiuads7623ohdas',
                        uid: 'home-in-english',
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
prismicJavascript.Predicates = Prismic.Predicates;

module.exports = prismicJavascript;
