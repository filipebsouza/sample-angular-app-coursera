import { Component, OnInit } from '@angular/core';

import { FacadeService } from '../shared/services/facade.service';

import { Dish } from '../shared/dish.model';
import { Promotion } from '../shared/promotion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;

  constructor(private facadeService: FacadeService) { }

  ngOnInit() {
    this.facadeService.dishService.getFeaturedDish().subscribe(dish => this.dish = dish);
    this.facadeService.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
  }

}
