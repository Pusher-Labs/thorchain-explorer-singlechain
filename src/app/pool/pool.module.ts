import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoolComponent } from './pool.component';
import { TransactionsTableModule } from '../_components/transactions-table/transactions-table.module';
import { PoolStakersTableModule } from '../_components/pool-members-table/pool-members-table.module';
import { PoolTxsComponent } from './pool-txs/pool-txs.component';
import { PoolStakersComponent } from './pool-members/pool-members.component';
import { PoolDetailsComponent } from './pool-details/pool-details.component';
import { PipesModule } from '../_pipes/pipes.module';
import { LoadingModule } from '../_components/loading/loading.module';
import { AssetLogoModule } from '../_components/asset-logo/asset-logo.module';
import { ErrorModule } from '../_components/error/error.module';

@NgModule({
  declarations: [PoolComponent, PoolTxsComponent, PoolDetailsComponent, PoolStakersComponent],
  imports: [
    CommonModule,
    PipesModule,
    TransactionsTableModule,
    PoolStakersTableModule,
    LoadingModule,
    AssetLogoModule,
    ErrorModule,
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
            component: PoolTxsComponent,
            data: {
                breadcrumb: 'Transactions'
            }
          },
          {
            path: 'members',
            component: PoolStakersComponent,
            data: {
                breadcrumb: 'Members'
            }
          }
        ]
      }
    ])
  ]
})
export class PoolModule { }
