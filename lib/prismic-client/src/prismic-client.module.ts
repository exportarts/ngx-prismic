import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RenderHtmlPipe } from './pipes/render-html.pipe';
import { RenderImagePipe } from './pipes/render-image.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    RenderHtmlPipe,
    RenderImagePipe,
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RenderHtmlPipe,
    RenderImagePipe,
    SafePipe
  ]
})
export class PrismicClientModule { }
