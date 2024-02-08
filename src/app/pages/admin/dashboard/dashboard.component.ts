import { Component, OnInit } from '@angular/core';
import { CarInfo, DialogAdminComponent } from 'src/app/shared/dialog-admin/dialog-admin.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';


export interface PeriodicElement {
  title: string;
  img: string;
  position: number;
  marca: string;
  price: number;
}

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}


const carInfo: CarInfo = {
  title: "Car Title",
  price: 20000,
  brand: "Honda",
  model: "Civic",
  mileage: 50000,
  manufacturingYear: "2024",
  modelYear: "2024",
  bodyStyle: "Sedan",
  description: "This is a great car!",
  options: {
    abs: false,
    airbags: true,
    stabilityControl: true,
    tractionControl: false,
    emergencyBrakeAssist: true,
    collisionWarningSystem: true,
    airConditioning: false,
    powerWindows: false,
    electricPowerSteering: false,
    leatherSeats: true,
    driverSeatHeightAdjustment: true,
    soundSystem: false,
    rearViewCamera: true,
    navigationSystem: false,
    bluetooth: false,
    multifunctionalSteeringWheel: true,
  },
};

export interface DialogData {
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', title: 'Toyota buzier 2.5 (2023)', marca: 'toyota', price: 40000 },
  { position: 2, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', title: 'Chevrolet onix ltz (2023)', marca: 'chevrolet', price: 30000 },

];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  routerActive: string = "activelink";
  images: GalleryItem[] = [];



  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private router: Router) { }



  openDialog(id: number | null, marca: string | null, edit: boolean | null, del: boolean | null): void {
    let dialogRef;

    if (id === null && marca === null) {
      dialogRef = this.dialog.open(DialogAdminComponent, {
        data: {}
      });

    } else {
      dialogRef = this.dialog.open(DialogAdminComponent, {
        data: { car: carInfo, edit: edit, del: del },
      });
    }
  }


  displayedColumns: string[] = ['position', 'img', 'title', 'marca', 'price', 'actions'];
  dataSource = ELEMENT_DATA;


  search: boolean = false;

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
      link: "/admin/table/automovel",
      icon: "truck",
      menu: "Lista Automóveis",
    },
    {
      link: "/admin/post/automovel",
      icon: "plus",
      menu: "Anúnciar Automóvel",
    },
    {
      link: "/admin/table/motocicleta",
      icon: "disc",
      menu: "Lista Motocicletas",
    },
    {
      link: "/admin/post/motocicleta",
      icon: "plus",
      menu: "Anúnciar Motocicleta",
    },
    {
      link: "/",
      icon: "eye",
      menu: "Visão do visitante",
    },
    {
      link: "/",
      icon: "pie-chart",
      menu: "Análises",
    },
  ]


  ngOnInit() {
    this.images = [
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
    ];
  }


}
