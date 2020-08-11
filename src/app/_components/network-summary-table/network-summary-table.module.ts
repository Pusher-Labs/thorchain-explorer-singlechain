import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkSummaryTableComponent } from './network-summary-table.component';
import { PipesModule } from '../../_pipes/pipes.module';


@NgModule({
  declarations: [NetworkSummaryTableComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    NetworkSummaryTableComponent
  ]
})
export class NetworkSummaryTableModule { }
