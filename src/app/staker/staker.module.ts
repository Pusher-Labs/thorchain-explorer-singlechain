import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StakerComponent } from './staker.component';
import { LoadingModule } from '../_components/loading/loading.module';


@NgModule({
  declarations: [StakerComponent],
  imports: [
    CommonModule,
    LoadingModule,
    RouterModule.forChild([
      {
        path: '',
        component: StakerComponent
      }
    ])
  ]
})
export class StakerModule { }
