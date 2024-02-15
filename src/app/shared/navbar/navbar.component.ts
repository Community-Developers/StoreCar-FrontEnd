import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showFiller = false;
  headerSticky: boolean = false;

  constructor(public dialog: MatDialog) { }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.headerSticky = true
    }
    else {
      this.headerSticky = false
    }
  }

  openDialog() {
    console.log('O diálogo de login foi aberto');
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      data: {},
    });
  }
}
