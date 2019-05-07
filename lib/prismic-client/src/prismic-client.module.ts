import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RenderHtmlPipe } from './pipes/render-html.pipe';

@NgModule({
  declarations: [
    RenderHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RenderHtmlPipe
  ]
})
export class PrismicClientModule { }
