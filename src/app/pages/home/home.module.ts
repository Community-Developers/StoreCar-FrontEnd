import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    SlickCarouselModule
  ]
})
export class HomeModule { }
