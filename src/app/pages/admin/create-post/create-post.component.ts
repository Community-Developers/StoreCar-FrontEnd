import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  routerActive: string = "activelink";
  checked = true;


  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  sidebarMenu: sidebarMenu[] = [
    {
      link: "/admin",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/admin/table",
      icon: "truck",
      menu: "Lista Automóveis",
    },
    {
      link: "/admin/post",
      icon: "plus",
      menu: "Anúnciar Automóvel",
    },
    {
      link: "/admin/table",
      icon: "disc",
      menu: "Lista Motocicletas",
    },
    {
      link: "/admin/post",
      icon: "plus",
      menu: "Anúnciar Motocicleta",
    },
    {
      link: "/home",
      icon: "eye",
      menu: "Visão do visitante",
    },
    {
      link: "/home",
      icon: "pie-chart",
      menu: "Análises",
    },
  ]

  onBack(): void {
    this.router.navigate(['/flexy/home']);
  }

}
