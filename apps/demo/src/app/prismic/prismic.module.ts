import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrismicServiceConfig, PrismicServiceConfigProvider } from '@ngx-prismic/client';

const config: PrismicServiceConfig = {
  prismicUrl: 'https://ngx-prismic-demo.cdn.prismic.io/api/v2'
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: PrismicServiceConfigProvider,
      useValue: config
    }
  ]
})
export class PrismicModule { }
