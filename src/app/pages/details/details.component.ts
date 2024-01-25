import { Component, OnInit } from '@angular/core';


import {
  GalleryModule,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  Gallery,
} from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  images: GalleryItem[] = [];
  title = 'ng-carousel-demo';
  value: 'top' | 'left' | 'right' | 'bottom' = 'top';

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
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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

  ngOnInit() {
    this.images = [
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
      new ImageItem({ src: '/assets/download.jpeg', thumb: '/assets/download.jpeg' }),
    ];

    this.atualizarValorComBaseNaLarguraDaTela();
  }

}
