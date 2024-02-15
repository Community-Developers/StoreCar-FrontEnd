import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'ng-carousel-demo';

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
      img: "/assets/bmw.jpg",
      one: true,
      btnText: 'Ver Motocicletas',
      text: 'Motocicletas & Ciclomotores',
      descricao: 'Experimente a liberdade sobre rodas com nossas motocicletas, triciclos, e ciclomotores - escolha entre modelos elétricos para uma viagem sustentável'
    },
    { img: "assets/mer.jpg", one: false, btnText: 'Ver Veículos', text: 'Carros' }
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
    private router: Router, private adminService: AdminService
  ) { }
  ngOnInit(): void {
    this.loadMotos();
  }

  onClick() {
    this.router.navigateByUrl("/details")
  }


  duplicar() {
    const aux: any[] = [];
    for (let item of this.carDestaques) {
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
        imagem: moto.imagensMotocicleta[0].imageUrl
      }))
      this.duplicar();
    })
  }
}