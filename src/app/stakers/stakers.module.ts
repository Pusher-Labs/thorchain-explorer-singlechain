import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StakersComponent } from './stakers.component';
import { LoadingModule } from '../_components/loading/loading.module';


@NgModule({
  declarations: [StakersComponent],
  imports: [
    CommonModule,
    LoadingModule,
    RouterModule.forChild([
      {
        path: '',
        component: StakersComponent
      }
    ])
  ]
})
export class StakersModule { }
