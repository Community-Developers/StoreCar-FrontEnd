import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'ng-carousel-demo';
  isScreenSmall: boolean = false;


  slides = [
    { img: "https://dummyimage.com/350x150/423b42/fff" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/1a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/7a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/9a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/5a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/4a2b7a/fff" }
  ];

  slides2 = [
    {
      img: "/assets/bmw.webp",
      smallImgPath: "/assets/one-650-1.webp",
      one: true,
      btnText: 'Ver Motocicletas',
      text: 'Motocicletas',
      descricao: 'Motocicletas, Ciclomotores e Triciclos',
      path: '/list/motocicleta'
    },
    {
      img: "assets/mer.webp",
      smallImgPath: "assets/one-650-1.webp",
      one: false,
      btnText: 'Ver Veículos',
      text: 'Carros',
      path: '/list/veiculo'
    }
  ];




  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    autoplay: true,
    autoplaySpeed: 1400,
    "responsive": [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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


  slideConfig2 = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    autoplay: true,
    autoplaySpeed: 1550
    // "responsive": [
    //   {
    //     breakpoint: 1440,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 650,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1
    //     }
    //   },
    //   {
    //     breakpoint: 575,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };
  carDestaques: any[] = [];



  constructor(
    private router: Router, private adminService: AdminService) {
    this.isScreenSmall = window.innerWidth < 650
  }
  ngOnInit(): void {
    // this.loadMotos();
    this.loadCarros();
  }

  onClick(path: string) {
    this.router.navigateByUrl("/list" + path);
  }


  duplicar() {
    const aux: any[] = [];
    for (let item of this.carDestaques) {
      aux.push(item);
      aux.push(item);
      aux.push(item);
      aux.push(item);
      aux.push(item);
    }
    this.carDestaques = aux;
  }

  loadMotos() {
    this.adminService.getDestaquesMobi().subscribe(motos => {
      this.carDestaques = motos.map(moto => ({
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

  loadCarros() {
    this.adminService.getDestaquesCarros().subscribe(carros => {
      this.carDestaques = carros.map(carro => ({
        id: carro.id,
        type: 'veiculo',
        km: carro.km,
        titulo: carro.titulo,
        combustivel: carro.combustivel,
        potenciaMotor: carro.potenciaMotor,
        valor: carro.valor,
        imagem: carro.imagensVeiculos[0]?.imageUrl
      }))
      // this.duplicar();
    })
  }

  @HostListener('window:resize')
  onResize() {
    // Atualiza isScreenSmall com base na largura da tela atual
    this.isScreenSmall = window.innerWidth < 650;
  }
}