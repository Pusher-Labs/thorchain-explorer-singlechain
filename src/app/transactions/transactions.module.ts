import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransactionsComponent } from './transactions.component';
import { TransactionsTableModule } from '../_components/transactions-table/transactions-table.module';
import { LoadingModule } from '../_components/loading/loading.module';
import { ErrorModule } from '../_components/error/error.module';
import { ContentItemModule } from '../_components/content-item/content-item.module';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsTableModule,
    FormsModule,
    LoadingModule,
    ErrorModule,
    ContentItemModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionsComponent
      }
    ])
  ]
})
export class TransactionsModule { }
