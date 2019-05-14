# ngx-prismic

[![npm](https://img.shields.io/npm/v/ngx-prismic.svg)](https://www.npmjs.com/package/ngx-prismic)
[![Build Status](https://travis-ci.com/exportarts/ngx-prismic.svg?branch=master)](https://travis-ci.com/exportarts/ngx-prismic)
[![codecov](https://codecov.io/gh/exportarts/ngx-prismic/branch/master/graph/badge.svg)](https://codecov.io/gh/exportarts/ngx-prismic)

This project is intended to provide easier integration of
[prismic.io](https://prismic.io) into Angular Projects.

> Work in Progress... More featues and docs are coming in the future.

## How to use

This module is built on top of [prismic-javascript](https://github.com/prismicio/prismic-javascript)
and [prismic-dom](https://github.com/prismicio/prismic-dom) as well as [angular](https://github.com/angular/angular).

In `lib/renderer/` you find helper-functions and models around `prismic-dom` to generate HTML from
the CMS-data. It is intended to grow if a common functionality is needed but not provided by `prismic-dom` itself.

In `lib/universal` you find helper methods used in the context of prerendering pages with
[Angular Universal](https://github.com/angular/universal).

Finally, in `lib/prismic-client` you find a service built with Angular's [`HttpClient`](https://angular.io/guide/http)
to query the Prismic API.

## Dependency Management

The project in `./lib` has several peer-dependencies. Those are installed
as dev-dependencies in the main project to have them available during
development, but to not have them included in the final `package.json`.
