import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RoutingModule } from '../routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class SharedModule { }
