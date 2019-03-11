# ngx-prismic

This project is intended to provide easier integration of
[prismic.io](https://prismic.io) into Angular Projects.

> Work in Progress... More featues and docs are coming in the future.

## How to use

This module is built on top of [prismic-javascript](https://github.com/prismicio/prismic-javascript)
and [prismic-dom](https://github.com/prismicio/prismic-dom) as well as [angular](https://github.com/angular/angular).

It provides type information in `lib/src/models/` which can make it easier to interact with the several types returned
by the Prismic API.

In `lib/src/renderer/` you find a `RendererService` which provides some useful shortcuts around `prismic-dom`
to generate HTML from the CMS-data. It is intended to grow if a common functionality is needed but not provided
by `prismic-dom` itself.

Finally, in `lib/src/prismic-client` you find a service built with Angular's [`HttpClient`](https://angular.io/guide/http)
to query the Prismic API.

## Dependency Management

The project in `./lib` has several peer-dependencies. Those are installed
as dev-dependencies in the main project to have them available during
development, but to not have them included in the final `package.json`.
