import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CardStarComponent } from './card-star/card-star.component';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DialogAdminComponent } from './dialog-admin/dialog-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';




@NgModule({
  declarations: [
    NavbarComponent,
    CardStarComponent,
    FooterComponent,
    DialogAdminComponent,
    DialogLoginComponent,

  ],
  imports: [
    CommonModule,
    RoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    CardStarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
