import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { Dish } from '../dish.model';
import { DISHES } from '../dishes.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES);
  }

  getDish(id: string): Observable<Dish> {
    return from(DISHES)
      .pipe(
        filter(dish => dish.id === id),
        first()
      );
  }

  getFeaturedDish(): Observable<Dish> {
    return from(DISHES)
      .pipe(
        filter(dish => dish.featured),
        first()
      );
  }
}
