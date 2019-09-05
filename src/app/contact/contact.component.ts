import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback.model';

import { flyInOut, visibility, expand } from '../shared/animations/app.animation';
import { FeedbackService } from '../shared/services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), visibility(), expand()]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackErrMess: string;
  submitting = false;
  contactType = ContactType;
  visibilityForm = 'shown';
  visibilityFeed = 'hidden';
  @ViewChild('fform', { static: false }) feedbackFormDirective: { resetForm: () => void; };

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder, private feedBackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['teste', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['teste', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [3333, [Validators.required, Validators.pattern]],
      email: ['teste@teste.com', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: 'sadddd dddd ddddddd ddgg'
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;

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
    this.submitting = true;
    this.visibilityFeed = 'shown';
    this.visibilityForm = 'hidden';
    
    this.feedBackService.submitFeedback(this.feedbackForm.value)
      .subscribe(feedBackSaved => {
        this.feedback = feedBackSaved;        
        this.feedbackForm.reset({
          firstname: '',
          lastname: '',
          telnum: 0,
          email: '',
          agree: false,
          contacttype: 'None',
          message: ''
        });
        this.feedbackFormDirective.resetForm();
        this.submitting = false;      

        setTimeout(() => {
          this.feedback = undefined;
          this.visibilityForm = 'shown';
          this.visibilityFeed = 'hidden';
        }, 5000);
      }, errmess => {
        this.feedbackErrMess = <any>errmess;
        this.submitting = false;
        this.feedback = undefined;
        this.visibilityForm = 'shown';
        this.visibilityFeed = 'hidden';
      });
  }

}
