import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StatsTableComponent } from '../_components/stats-table/stats-table.component';
import { PipesModule } from '../_pipes/pipes.module';
import { NetworkSummaryTableModule } from '../_components/network-summary-table/network-summary-table.module';

@NgModule({
  declarations: [DashboardComponent, StatsTableComponent],
  imports: [
    CommonModule,
    PipesModule,
    NetworkSummaryTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      }
    ])
  ]
})
export class DashboardModule { }
