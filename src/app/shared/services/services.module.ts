import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './account.service';
import { FacadeService } from './facade.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AccountService,
    FacadeService
  ]
})
export class ServicesModule { }
