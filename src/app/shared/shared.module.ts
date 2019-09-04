import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/services.module';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [HighlightDirective],
  imports: [
    CommonModule,
    ServicesModule
  ]
})
export class SharedModule { }
