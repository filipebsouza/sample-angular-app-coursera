import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FacadeService } from '../shared/services/facade.service';

import { Dish } from '../shared/dish.model';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;

  constructor(private route: ActivatedRoute, private location: Location, private facadeService: FacadeService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.facadeService.dishService.getDish(id).subscribe(dish => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

}
