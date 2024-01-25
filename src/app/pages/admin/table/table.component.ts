import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

export interface PeriodicElement {
  id: number;
  name: string;
  work: string;
  project: string;
  priority: string;
  badge: string;
  budget: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Deep Javiya', work: 'Frontend Devloper', project: 'Flexy Angular', priority: 'Low', badge: 'badge-info', budget: '$3.9k' },
  { id: 2, name: 'Nirav Joshi', work: 'Project Manager', project: 'Hosting Press HTML', priority: 'Medium', badge: 'badge-primary', budget: '$24.5k' },
  { id: 3, name: 'Sunil Joshi', work: 'Web Designer', project: 'Elite Admin', priority: 'High', badge: 'badge-danger', budget: '$12.8k' },
  { id: 4, name: 'Maruti Makwana', work: 'Backend Devloper', project: 'Material Pro', priority: 'Critical', badge: 'badge-success', budget: '$2.4k' },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  displayedColumns: string[] = ['id', 'assigned', 'name', 'priority', 'budget', 'actions'];
  dataSource = ELEMENT_DATA;
  routerActive: string = "activelink";




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



}
