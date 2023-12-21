import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { CardStarComponent } from './card-star/card-star.component';


@NgModule({
  declarations: [
    NavbarComponent,
    CardStarComponent

  ],
  imports: [
    CommonModule,
    RoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    NavbarComponent,
    CardStarComponent
  ]
})
export class SharedModule { }
