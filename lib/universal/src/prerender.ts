// Angular dependencies
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// File System
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { mkdirSync } from 'mkdir-recursive';
import { join } from 'path';

// Internal
import { PrerenderConfig, DEFAULT_EXTRA_OPTIONS } from './prerender.model';
import { getRoutes } from './routes';
import { generateSitemap } from './sitemap';

/**
 * Use this function to prerender your angular app according
 * to the provided configuration object.
 * 
 * Make sure you have the following lines at the very top of your prerender-file.
 * This is required to have the code run inside Zone properly.
 * ```ts
 * import 'reflect-metadata';
 * import 'zone.js/dist/zone-node';
 * ```
 *
 * @param config The Prerender Configuration
 */
export async function prerenderApplication(config: PrerenderConfig) {
    config.extras = config.extras || DEFAULT_EXTRA_OPTIONS;

    // Enable prod mode for faster renders
    enableProdMode();
    
    const BROWSER_FOLDER = join(process.cwd(), config.browserFolder);
    const INDEX_HTML = readFileSync(join(BROWSER_FOLDER, 'index.html'), 'utf8');
    const routes = await getRoutes(config.routeConfig, config.extras);
  
    for (const route of routes) {
      const fullPath = join(BROWSER_FOLDER, route);
  
      // Make sure the directory structure is there
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath);
      }
  
      const html = await renderModuleFactory(config.serverBuild.AppServerModuleNgFactory, {
        document: INDEX_HTML,
        url: route,
        extraProviders: [
          provideModuleMap(config.serverBuild.LAZY_MODULE_MAP)
        ]
      });
      writeFileSync(join(fullPath, 'index.html'), html);
      config.extras.logFunc(`Rendered ${route}`);
    }

    // Generate sitemaps if configured
    if (config.sitemapConfig) {
      config.extras.logFunc(`Generating sitemap ...`);
      await generateSitemap(config.sitemapConfig, routes, BROWSER_FOLDER);
    }
}
