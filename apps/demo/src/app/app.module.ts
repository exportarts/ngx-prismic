import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PrismicModule } from './prismic/prismic.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PrismicModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
