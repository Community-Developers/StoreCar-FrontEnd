import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  moto() {
    this.router.navigateByUrl("/list/motocicleta");


  }
  auto() {
    this.router.navigateByUrl("/list/veiculo")
  }
  showFiller = false;
  headerSticky: boolean = false;

  constructor(public dialog: MatDialog, private router: Router) { }

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

  // navegarParaSecao(secao: string) {
  //   this.router.navigate(['/'], { fragment: secao });
  // }

  navegarParaSecao(secao: string) {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
    setTimeout(() => {
      var elemento = document.getElementById(secao);
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }
}