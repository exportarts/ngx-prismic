export { PrismicClientModule } from './prismic-client.module';
export { PrismicService, ProjectorFunc, API_TOKEN } from './services/prismic.service';
export { PrismicServiceConfig, PrismicServiceConfigProvider } from './services/prismic-service.config';
export * from './services/content-validation';

export * from './models/api.model';
export * from './models/image.model';
export * from './models/slice.model';
export * from './models/span.model';
export * from './models/typography.model';
export * from './models/video-embed.model';
export * from './models/link.model';
export * from './models/geolocation.model';
export * from './models/aliased-types.model';

export * from './utils/resolver';

export { HtmlSerializer } from './pipes/render-html.pipe';

export * from './guards/preview.guard';
