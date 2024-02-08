import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { allIcons } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';
import { HttpClientModule } from '@angular/common/http';
import { NgxCurrencyDirective } from "ngx-currency";




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    FeatherModule.pick(allIcons),
    HttpClientModule,
    NgxCurrencyDirective
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
