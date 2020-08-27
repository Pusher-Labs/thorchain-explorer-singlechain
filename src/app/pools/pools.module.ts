import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoolsComponent } from './pools.component';
import { LoadingModule } from '../_components/loading/loading.module';
import { AssetLogoModule } from '../_components/asset-logo/asset-logo.module';


@NgModule({
  declarations: [PoolsComponent],
  imports: [
    CommonModule,
    LoadingModule,
    AssetLogoModule,
    RouterModule.forChild([
      {
        path: '',
        component: PoolsComponent
      }
    ])
  ]
})
export class PoolsModule { }
