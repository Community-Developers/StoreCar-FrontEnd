import { Component } from '@angular/core';
import { CarInfo, DialogAdminComponent } from 'src/app/shared/dialog-admin/dialog-admin.component';
import { MatDialog } from '@angular/material/dialog';


export interface PeriodicElement {
  title: string;
  img: string;
  position: number;
  marca: string;
  price: number;
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
export class DashboardComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(id: number | null, marca: string | null, edit: boolean | null, del: boolean | null): void {
    let dialogRef;
  
    if (id === null && marca === null) {
      dialogRef = this.dialog.open(DialogAdminComponent, {
        data: {}
      });
      
    } else {
      dialogRef = this.dialog.open(DialogAdminComponent, {
        data: { car:carInfo, edit: edit, del: del },
      });
    }
  }
  

  displayedColumns: string[] = ['position', 'img', 'title', 'marca', 'price', 'actions'];
  dataSource = ELEMENT_DATA;
}
