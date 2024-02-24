import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
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


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService,
    private viewportScroller: ViewportScroller
  ) { }


  pageIndex: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;


  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
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
    this.adminService.getAllCars(this.pageIndex, this.pageSize).subscribe(response => {
      const cars = response.content
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
      this.totalItems = response.totalElements;
      console.log(response.totalElements + "TOTAL DE VEICULOS");
      this.isLoading = false;
      console.log(this.items);
    });
  }

  loadMotos() {
    this.adminService.getAllMobi(this.pageIndex, this.pageSize).subscribe(response => {
      const motos = response.content
      this.items = motos.map(moto => ({
        id: moto.id,
        type: 'motocicleta',
        km: moto.km,
        titulo: moto.titulo,
        combustivel: moto.combustivel,
        potenciaMotor: moto.potencia,
        cilindrada: moto.cilindrada,
        valor: moto.valor,
        imagem: moto.imagensMotocicleta[0]?.imageUrl
      }))
      this.totalItems = response.totalElements;
      console.log(this.totalItems + "TOTAL DE MOTOS");
      this.isLoading = false;
      console.log(this.items);
    });
  }
  mudarPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    if (this.isVeiculo) {
      this.loadCars();
    } else if (!this.isVeiculo) {
      this.loadMotos();
    }
  }
}