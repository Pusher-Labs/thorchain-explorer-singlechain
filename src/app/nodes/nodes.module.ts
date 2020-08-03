import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NodesComponent } from './nodes.component';
import { NodesTableComponent } from './nodes-table/nodes-table.component';


@NgModule({
  declarations: [NodesComponent, NodesTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NodesComponent
      }
    ])
  ]
})
export class NodesModule { }
