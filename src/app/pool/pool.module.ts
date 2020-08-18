import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoolComponent } from './pool.component';
import { TransactionsTableModule } from '../_components/transactions-table/transactions-table.module';
import { PoolTxsComponent } from './pool-txs/pool-txs.component';
import { PoolDetailsComponent } from './pool-details/pool-details.component';
import { PipesModule } from '../_pipes/pipes.module';
import { LoadingModule } from '../_components/loading/loading.module';

@NgModule({
  declarations: [PoolComponent, PoolTxsComponent, PoolDetailsComponent],
  imports: [
    CommonModule,
    PipesModule,
    TransactionsTableModule,
    LoadingModule,
    RouterModule.forChild([
      {
        path: '',
        component: PoolComponent,
        children: [
          {
            path: '',
            component: PoolDetailsComponent
          },
          {
            path: 'txs',
            component: PoolTxsComponent
          }
        ]
      }
    ])
  ]
})
export class PoolModule { }
