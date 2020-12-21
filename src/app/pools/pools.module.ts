import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoolsComponent } from './pools.component';
import { LoadingModule } from '../_components/loading/loading.module';
import { AssetLogoModule } from '../_components/asset-logo/asset-logo.module';
import { ErrorModule } from '../_components/error/error.module';
import { ContentItemModule } from '../_components/content-item/content-item.module';

@NgModule({
  declarations: [PoolsComponent],
  imports: [
    CommonModule,
    LoadingModule,
    AssetLogoModule,
    ErrorModule,
    ContentItemModule,
    RouterModule.forChild([
      {
        path: '',
        component: PoolsComponent
      }
    ])
  ]
})
export class PoolsModule { }
