import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {
  GalleryModule,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  Gallery,
} from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';


@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    SlickCarouselModule,
    GalleryModule,
    AngularMaterialModule
  ]
})
export class DetailsModule { }
