import { AdminService } from './../../../services/admin.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { CarInfo, DialogAdminComponent } from 'src/app/shared/dialog-admin/dialog-admin.component';
import { Car } from 'src/app/shared/navbar/car.interface';
import { Moto } from 'src/app/shared/navbar/moto.interface';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
  disabled?: boolean;
}

export interface AutoElement {
  id: number;
  marca: string;
  type: string;
  modelo: string;
  ano: number;
  status: string;
  destacado: boolean;
  valor: number;
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


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  deleteItem(idItem: number, type: string) {
    this.adminService.deleteItem(idItem, type).subscribe();
    this.loadItems();
  }

  cars: Car[] = [];
  motos: Moto[] = [];
  isLoading = false;



  displayedColumns: string[] = ['id', 'marca', 'modelo', 'ano', 'status', 'valor', 'actions'];
  dataSource: AutoElement[] = [];
  routerActive: string = "activelink";

  @ViewChild(MatTable) table?: MatTable<any>;



  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private adminService: AdminService,
    private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadItems();
    console.log(this.cars.length);
  }
  loadItems() {
    this.activatedRoute.params.subscribe(params => {
      this.dataSource = [];
      const type = params['type'];
      if (type === 'automovel') {
        console.log("ENTROU NO CARRO")
        this.loadCars();
      } else if (type === 'motocicleta') {
        this.loadMotos();
      }
    });
  }


  loadCars() {
    this.adminService.getAllCars().subscribe(cars => {
      this.dataSource = cars.map(car => ({
        id: car.id,
        marca: car.marca,
        type: 'veiculo',
        modelo: car.modelo,
        ano: car.anoFabricacao,
        status: car.destaque ? 'Destacado' : 'Destacar', // Exemplo de como manipular o status
        destacado: car.destaque,
        valor: car.valor
      }));
    });
  }

  loadMotos() {
    this.adminService.getAllMobi().subscribe(motos => {
      this.dataSource = motos.map(moto => ({
        id: moto.id,
        marca: moto.marca,
        type: 'motocicleta',
        modelo: moto.modelo,
        ano: moto.anoFabricacao,
        status: moto.destaque ? 'Destacado' : 'Destacar', // Exemplo de como manipular o status
        destacado: moto.destaque,
        valor: moto.valor
      }));
    });
  }



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
      menu: "Visão do visitante (em breve)",
      disabled: true
    },
    {
      link: "/",
      icon: "pie-chart",
      menu: "Análises (em breve)",
      disabled: true
    },
  ]


  openDialog(id: number, marca: string, type: string, edit: boolean, del: boolean): void {
    let dialogRef;

    if (del) {
      dialogRef = this.dialog.open(DialogAdminComponent, {
        data: { id: id, marca: marca, type: type, modelo: marca, del: del }
      });

    } else if (edit) {
      dialogRef = this.dialog.open(DialogAdminComponent, {
        data: { car: carInfo, edit: edit, del: del },
      });
    }

    dialogRef?.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true; // Inicia o indicador de carregamento antes da requisição.
        this.adminService.deleteItem(id, type).subscribe({
          next: (res) => {
            console.log(res); // Log da resposta
            this.dataSource = this.dataSource.filter(item => item.id !== id);
            this.table?.renderRows();

            this.isLoading = false; // Desativa o indicador de carregamento após a conclusão da requisição.
          },
          error: (error) => {
            console.error('Erro ao deletar o item:', error);
            this.isLoading = false; // Assegura que o indicador de 
          }
        });
      };
    })
  }

  editItem(id: number, type: string) {
    this.router.navigate([`/admin/edit/${type}/${id}`]);
  }

  detalhar(type: string, id: any) {
    this.router.navigate([`/details/${type}/${id}`]);
  }
}
