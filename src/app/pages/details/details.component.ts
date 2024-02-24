import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import {
  GalleryModule,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  Gallery,
} from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { AdminService } from 'src/app/services/admin.service';
import { Car } from 'src/app/shared/navbar/car.interface';
import { Moto } from 'src/app/shared/navbar/moto.interface';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  images: GalleryItem[] = [];
  title = 'ng-carousel-demo';
  value: 'top' | 'left' | 'right' | 'bottom' = 'top';


  veiculo: Car | null = null;
  motocicleta: Moto | null = null;

  isCar: boolean = false;
  isLoading: boolean = false;
  imgAux: any = [];




  constructor(private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService, private viewportScroller: ViewportScroller) { }


  private atualizarValorComBaseNaLarguraDaTela(): void {
    const larguraDaTela = window.innerWidth;

    // Verifique a largura da tela e atribua o valor apropriado à variável
    this.value = larguraDaTela <= 1024 ? 'top' : 'left';
  }

  slides = [
    { img: "https://dummyimage.com/350x150/423b42/fff" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/423b42/fff" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/423b42/fff" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" }
  ];
  slideConfig = {
    "slidesToShow": 2,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    autoplay: true,
    autoplaySpeed: 1500,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  carrosDestaques: any[] = [];

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.loadDestaques();

    this.activatedRoute.params.subscribe(params => {
      const type = params['type'];
      const id = params['id'];
      if (type && id) {
        if (type == 'veiculo') {
          this.isCar = true;
          console.log("MOSTRAR CARRO");
          this.loadItem(type, id);

        } else if (type == 'motocicleta') {
          console.log("MOSTRAR MOTOCICLETA");
          this.loadItem(type, id);

        } else {
          console.log("Página non existente");

        }
      }
      else {
        //this.veiculo = true;
        console.log("Página non existente");
      }
    });
    this.atualizarValorComBaseNaLarguraDaTela();
  }
  loadDestaques() {
    console.log("LOAD DESTAQUES")
    this.adminService.getDestaquesMobi().subscribe(motos => {
      this.carrosDestaques = motos.map(moto => ({
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
    })
  }


  loadItem(type: string, id: string) {
    this.isLoading = true;
    this.adminService.getItem(type, id).subscribe({
      next: (item) => {
        this.images = [];
        if (type == 'veiculo') {
          this.veiculo = item;
          if (item.imagensVeiculos) {
            for (let foto of item.imagensVeiculos) {
              this.images.push(new ImageItem({ src: foto.imageUrl.replace(/ /g, '+'), thumb: foto.imageUrl.replace(/ /g, '+') }));
            }
          }
        } else if (type == 'motocicleta') {
          this.motocicleta = item;
          if (item.imagensMotocicleta) {
            for (let foto of item.imagensMotocicleta) {
              this.images.push(new ImageItem({ src: foto.imageUrl.replace(/ /g, '+'), thumb: foto.imageUrl.replace(/ /g, '+') }));
            }
          }
        }
        this.isLoading = false; // Desativa o indicador de carregamento após a conclusão da requisição.
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false; // Desativa o indicador de carregamento após a conclusão da requisição.
      }
    })
  }
}
