import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { allIcons } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';
import {
  GalleryModule,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  Gallery,
} from 'ng-gallery';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FeatherModule.pick(allIcons),
    GalleryModule,
  ]
})
export class AdminModule { }
