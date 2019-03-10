import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PrismicService, PrismicServiceConfig } from './services/prismic.service';

/**
 * Compiler-Flags:
 * - @dynamic (Allow lambda functions)
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PrismicClientModule {
  static forRoot(config: PrismicServiceConfig): ModuleWithProviders {
    return {
      ngModule: PrismicClientModule,
      providers: [
        {
          provide: PrismicService,
          deps: [
            HttpClient
          ],
          useFactory: (http: HttpClient) => new PrismicService(http, config)
        }
      ]
    };
  }
}
