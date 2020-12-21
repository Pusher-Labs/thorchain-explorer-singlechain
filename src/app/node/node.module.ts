import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NodeComponent } from './node.component';
import { LoadingModule } from '../_components/loading/loading.module';
import { PipesModule } from '../_pipes/pipes.module';
import { ErrorModule } from '../_components/error/error.module';
import { ContentItemModule } from '../_components/content-item/content-item.module';

@NgModule({
  declarations: [NodeComponent],
  imports: [
    CommonModule,
    LoadingModule,
    PipesModule,
    ErrorModule,
    ContentItemModule,
    RouterModule.forChild([
      {
        path: '',
        component: NodeComponent
      }
    ])
  ]
})
export class NodeModule { }
