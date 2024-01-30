import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'ng-carousel-demo';

  slides = [{ img: "https://dummyimage.com/350x150/423b42/fff" }, { img: "https://dummyimage.com/350x150/2a2b7a/fff" }, { img: "https://dummyimage.com/350x150/1a2b7a/fff" }, { img: "https://dummyimage.com/350x150/7a2b7a/fff" },
  { img: "https://dummyimage.com/350x150/9a2b7a/fff" },
  { img: "https://dummyimage.com/350x150/5a2b7a/fff" },
  { img: "https://dummyimage.com/350x150/4a2b7a/fff" }
  ];
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    autoplay: true,
    autoplaySpeed: 1100,
    "responsive": [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }


  constructor(
    private router: Router,
  ) { }

  onClick() {
    this.router.navigateByUrl("/details")
  }

}
