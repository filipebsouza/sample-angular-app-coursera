import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';

import { Dish } from '../shared/dish.model';
import { Comment } from '../shared/comment.model';

import { DishService } from '../shared/services/dish.service';

import { flyInOut, visibility, expand } from '../shared/animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), visibility(), expand()]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy: Dish;
  errMess: string;
  dishIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  commentForm: FormGroup;
  visibility = 'shown';
  @ViewChild('fform', { static: false }) commentFormDirective: { resetForm: () => void; };

  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author Name is required.',
    },
    'comment': {
      'required': 'Comment is required.',
    }
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private location: Location, private dishService: DishService,
    @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDish(params['id']);
      }))
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
      }, errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required]],
      rating: ['5'],
      comment: ['', [Validators.required]],
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();

    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
      }, errmess => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = <any>errmess;
      });

    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }

}
