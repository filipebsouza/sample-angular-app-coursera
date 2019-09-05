import { Component, OnInit, Inject } from '@angular/core';

import { DishService } from '../shared/services/dish.service';
import { PromotionService } from '../shared/services/promotion.service';
import { LeaderService } from '../shared/services/leader.service';

import { Dish } from '../shared/dish.model';
import { Promotion } from '../shared/promotion.model';
import { Leader } from '../shared/leader.model';

import { flyInOut, expand } from '../shared/animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), expand()]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader);
  }

}
