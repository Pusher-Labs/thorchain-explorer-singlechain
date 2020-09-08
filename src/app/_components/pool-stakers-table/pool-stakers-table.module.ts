import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolStakersTableComponent } from './pool-stakers-table.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../_pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [PoolStakersTableComponent],
  imports: [
    CommonModule,
    PipesModule,
    FontAwesomeModule,
    RouterModule,
    ChartsModule
  ],
  exports: [PoolStakersTableComponent]
})
export class PoolStakersTableModule { }
