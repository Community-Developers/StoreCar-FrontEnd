import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-star',
  templateUrl: './card-star.component.html',
  styleUrls: ['./card-star.component.scss']
})
export class CardStarComponent {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,) { }


  verDetalhes(type: string, id: string) {
    this.router.navigate([`/details/${type}/${id}`]);
  }

  @Input() item: any;
}
