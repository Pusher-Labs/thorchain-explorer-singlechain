import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolStakersTableComponent } from './pool-stakers-table.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../_pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PoolStakersTableComponent],
  imports: [
    CommonModule,
    PipesModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [PoolStakersTableComponent]
})
export class PoolStakersTableModule { }
