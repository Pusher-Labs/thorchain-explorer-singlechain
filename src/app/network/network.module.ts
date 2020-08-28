import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NetworkComponent } from './network.component';
import { NetworkDetailsComponent } from './network-details/network-details.component';
import { NetworkSummaryTableModule } from '../_components/network-summary-table/network-summary-table.module';
import { PipesModule } from '../_pipes/pipes.module';
import { LoadingModule } from '../_components/loading/loading.module';
import { ConstantsComponent } from './constants/constants.component';

@NgModule({
  declarations: [NetworkComponent, NetworkDetailsComponent, ConstantsComponent],
  imports: [
    CommonModule,
    PipesModule,
    LoadingModule,
    NetworkSummaryTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: NetworkComponent,
        children: [
          {
            path: '',
            component: NetworkDetailsComponent
          },
          {
            path: 'constants',
            component: ConstantsComponent
          }
        ]
      }
    ])
  ]
})
export class NetworkModule { }
