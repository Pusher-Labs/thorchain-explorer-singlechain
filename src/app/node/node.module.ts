import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NodeComponent } from './node.component';
import { LoadingModule } from '../_components/loading/loading.module';


@NgModule({
  declarations: [NodeComponent],
  imports: [
    CommonModule,
    LoadingModule,
    RouterModule.forChild([
      {
        path: '',
        component: NodeComponent
      }
    ])
  ]
})
export class NodeModule { }
