import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isVeiculo: boolean = false;
  isLoading = false;
  items: any[] = [];


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.items = [];
      const type = params['type'];
      if (type == 'veiculo') {
        console.log("ENTROU NO CARRO")
        this.isVeiculo = true;
        this.loadCars();
      } else if (type == 'motocicleta') {
        console.log("ENTROU NO MOTO")
        this.loadMotos();
      }
    })
  }

  loadCars() {
    this.isLoading = true;
    this.adminService.getAllCars().subscribe(cars => {
      this.items = cars.map(car => ({
        id: car.id,
        type: 'veiculo',
        titulo: car.titulo,
        km: car.km,
        combustivel: car.combustivel,
        potenciaMotor: car.potenciaMotor,
        valor: car.valor,
        imagem: car.imagensVeiculos[0]?.imageUrl
      }))

      this.isLoading = false;
      console.log(this.items);
    });
  }

  loadMotos() {
    this.adminService.getAllMobi().subscribe(cars => {
      this.items = cars.map(moto => ({
        id: moto.id,
        type: 'motocicleta',
        km: moto.km,
        titulo: moto.titulo,
        combustivel: moto.combustivel,
        potenciaMotor: moto.potencia,
        cilindrada: moto.cilindrada,
        valor: moto.valor,
        imagem: moto.imagensMotocicleta[0].imageUrl
      }))
      this.isLoading = false;
      console.log(this.items);
    });
  }
}