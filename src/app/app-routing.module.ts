import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    // redirectTo: 'txs',
    pathMatch: 'full'
  },
  {
    path: 'txs',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
      },
      {
        path: '',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
      }
    ],
    data: {
        breadcrumb: 'Transactions'
    }
  },
  {
    path: 'pools',
    children: [
      {
        path: ':pool',
        loadChildren: () => import('./pool/pool.module').then(m => m.PoolModule),
      },
      {
        path: '',
        loadChildren: () => import('./pools/pools.module').then(m => m.PoolsModule),
      }
    ],
    data: {
        breadcrumb: 'Assets'
    }
  },
  {
    path: 'members',
    children: [
      {
        path: ':address',
        loadChildren: () => import('./member/member.module').then(m => m.StakerModule),
      },
      {
        path: '',
        loadChildren: () => import('./members/members.module').then(m => m.MembersModule),
      }
    ],
    data: {
        breadcrumb: 'Members'
    }
  },
  {
    path: 'addresses',
    children: [
      {
        path: ':address',
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      }
    ],
    data: {
        breadcrumb: 'Addresses'
    }
  },
  {
    path: 'network',
    loadChildren: () => import('./network/network.module').then(m => m.NetworkModule),
    data: {
        breadcrumb: 'Network'
    }
  },
  {
    path: 'nodes',
    children: [
      {
        path: ':address',
        loadChildren: () => import('./node/node.module').then(m => m.NodeModule),
      },
      {
        path: '',
        loadChildren: () => import('./nodes/nodes.module').then(m => m.NodesModule),
      }
    ],
    data: {
        breadcrumb: 'Nodes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
