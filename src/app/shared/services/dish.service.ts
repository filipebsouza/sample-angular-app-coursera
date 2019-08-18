import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
}
