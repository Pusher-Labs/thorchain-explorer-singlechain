import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TxDetailTableDataComponent } from './tx-detail-table-data.component';
import { PipesModule } from '../../_pipes/pipes.module';
import { AssetLogoModule } from '../../_components/asset-logo/asset-logo.module';

@NgModule({
  declarations: [TxDetailTableDataComponent],
  imports: [
    CommonModule,
    PipesModule,
    AssetLogoModule,
    RouterModule
  ],
  exports: [TxDetailTableDataComponent]
})
export class TxDetailTableDataModule { }
