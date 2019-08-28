import { Component, OnInit } from '@angular/core';

import { DishService } from '../shared/services/dish.service';
import { PromotionService } from '../shared/services/promotion.service';
import { LeaderService } from '../shared/services/leader.service';

import { Dish } from '../shared/dish.model';
import { Promotion } from '../shared/promotion.model';
import { Leader } from '../shared/leader.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().then(dish => this.dish = dish);
    this.promotionService.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().then(leader => this.leader = leader);
  }

}
