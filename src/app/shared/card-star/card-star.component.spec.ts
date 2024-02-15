import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStarComponent } from './card-star.component';

describe('CardStarComponent', () => {
  let component: CardStarComponent;
  let fixture: ComponentFixture<CardStarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardStarComponent]
    });
    fixture = TestBed.createComponent(CardStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
