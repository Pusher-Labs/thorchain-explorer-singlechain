import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StakerComponent } from './staker.component';



@NgModule({
  declarations: [StakerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StakerComponent
      }
    ])
  ]
})
export class StakerModule { }
