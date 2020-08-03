import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoolsComponent } from './pools.component';



@NgModule({
  declarations: [PoolsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PoolsComponent
      }
    ])
  ]
})
export class PoolsModule { }
