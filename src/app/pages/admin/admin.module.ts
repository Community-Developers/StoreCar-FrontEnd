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
import { TableComponent } from './table/table.component';
import { RoutingModule } from 'src/app/routing.module';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    CreatePostComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FeatherModule.pick(allIcons),
    GalleryModule,
    RoutingModule,
    NgxCurrencyDirective,
    ReactiveFormsModule

  ]
})
export class AdminModule { }
