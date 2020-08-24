import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NodesComponent } from './nodes.component';
import { NodesTableComponent } from './nodes-table/nodes-table.component';
import { LoadingModule } from '../_components/loading/loading.module';
import { PipesModule } from '../_pipes/pipes.module';

@NgModule({
  declarations: [NodesComponent, NodesTableComponent],
  imports: [
    CommonModule,
    LoadingModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: NodesComponent
      }
    ])
  ]
})
export class NodesModule { }
