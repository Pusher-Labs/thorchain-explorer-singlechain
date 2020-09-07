import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NodesTableComponent } from './nodes-table.component';
import { PipesModule } from '../../_pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [NodesTableComponent],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [NodesTableComponent]
})
export class NodesTableModule { }
