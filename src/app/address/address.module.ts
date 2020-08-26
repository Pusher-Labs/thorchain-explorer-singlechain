import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { RouterModule } from '@angular/router';
import { TransactionsTableModule } from '../_components/transactions-table/transactions-table.module';
import { LoadingModule } from '../_components/loading/loading.module';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    TransactionsTableModule,
    LoadingModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddressComponent
      }
    ])
  ]
})
export class AddressModule { }
