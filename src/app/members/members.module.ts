import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StakersComponent } from './members.component';
import { LoadingModule } from '../_components/loading/loading.module';
import { ErrorModule } from '../_components/error/error.module';


@NgModule({
  declarations: [StakersComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ErrorModule,
    RouterModule.forChild([
      {
        path: '',
        component: StakersComponent
      }
    ])
  ]
})
export class StakersModule { }
