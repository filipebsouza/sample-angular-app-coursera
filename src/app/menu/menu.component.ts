import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish.model';
import { FacadeService } from '../shared/services/facade.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectedDish: Dish;

  constructor(private facadeService: FacadeService) {
  }

  ngOnInit() {
    this.facadeService.accountService.login('fake-user', 'password');
    this.facadeService.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
