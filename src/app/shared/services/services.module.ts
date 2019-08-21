import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './account.service';
import { DishService } from './dish.service';
import { PromotionService } from './promotion.service';
import { FacadeService } from './facade.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AccountService,
    DishService,
    PromotionService,
    FacadeService
  ]
})
export class ServicesModule { }
