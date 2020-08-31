import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NodesTableComponent } from './nodes-table.component';
import { PipesModule } from '../../_pipes/pipes.module';


@NgModule({
  declarations: [NodesTableComponent],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule
  ],
  exports: [NodesTableComponent]
})
export class NodesTableModule { }
