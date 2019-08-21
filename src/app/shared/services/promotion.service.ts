import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { Promotion } from '../../shared/promotion.model';
import { PROMOTIONS } from '../../shared/promotions.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS);
  }

  getPromotion(id: string): Observable<Promotion> {
    return from(PROMOTIONS)
      .pipe(
        filter(promo => promo.id === id),
        first()
      );
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return from(PROMOTIONS)
      .pipe(
        filter(promo => promo.featured),
        first()
      );
  }
}
