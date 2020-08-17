import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsTableComponent } from './transactions-table.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../_pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TxDetailTableDataModule } from '../tx-detail-table-data/tx-detail-table-data.module';

@NgModule({
  declarations: [TransactionsTableComponent],
  imports: [
    CommonModule,
    PipesModule,
    FontAwesomeModule,
    TxDetailTableDataModule,
    RouterModule
  ],
  exports: [TransactionsTableComponent]
})
export class TransactionsTableModule { }
