import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RenderHtmlPipe } from './pipes/render-html.pipe';
import { RenderImagePipe } from './pipes/render-image.pipe';

@NgModule({
  declarations: [
    RenderHtmlPipe,
    RenderImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RenderHtmlPipe,
    RenderImagePipe
  ]
})
export class PrismicClientModule { }
