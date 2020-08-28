import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [ErrorComponent]
})
export class ErrorModule { }
