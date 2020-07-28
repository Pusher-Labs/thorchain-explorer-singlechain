import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { TransactionsTableModule } from '../_components/transactions-table/transactions-table.module';


@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    TransactionsTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionComponent
      }
    ])
  ]
})
export class TransactionModule { }
