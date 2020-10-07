import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { LoadingModule } from '../_components/loading/loading.module';
import { ErrorModule } from '../_components/error/error.module';
import { PipesModule } from '../_pipes/pipes.module';


@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ErrorModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: MemberComponent
      }
    ])
  ]
})
export class StakerModule { }
