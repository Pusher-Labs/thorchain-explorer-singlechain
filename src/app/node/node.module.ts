import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NodeComponent } from './node.component';



@NgModule({
  declarations: [NodeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NodeComponent
      }
    ])
  ]
})
export class NodeModule { }
