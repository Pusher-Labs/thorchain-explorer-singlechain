import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsTableComponent } from './transactions-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TransactionsTableComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TransactionsTableComponent]
})
export class TransactionsTableModule { }
