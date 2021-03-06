import { Injectable, Injector } from '@angular/core';

import { AccountService } from './account.service';
import { DishService } from './dish.service';
import { PromotionService } from './promotion.service';
import { LeaderService } from './leader.service';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private injector: Injector) { }

  private _accountService: AccountService;
  public get accountService(): AccountService {
    if (!this._accountService) {
      this._accountService = this.injector.get(AccountService);
    }
    return this._accountService;
  }

  private _dishService: DishService;
  public get dishService(): DishService {
    if (!this._dishService) {
      this._dishService = this.injector.get(DishService);
    }
    return this._dishService;
  }

  private _promotionService: PromotionService;
  public get promotionService(): PromotionService {
    if (!this._promotionService) {
      this._promotionService = this.injector.get(PromotionService);
    }
    return this._promotionService;
  }

  private _leaderService: LeaderService;
  public get leaderService(): LeaderService {
    if (!this._leaderService) {
      this._leaderService = this.injector.get(LeaderService);
    }
    return this._leaderService;
  }

  private _processHTTPMsgService: ProcessHTTPMsgService;
  public get processHTTPMsgService(): ProcessHTTPMsgService {
    if (!this._processHTTPMsgService) {
      this._processHTTPMsgService = this.injector.get(ProcessHTTPMsgService);
    }
    return this._processHTTPMsgService;
  }
}
