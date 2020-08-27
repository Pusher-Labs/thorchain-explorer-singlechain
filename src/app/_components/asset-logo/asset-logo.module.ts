import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AssetLogoComponent } from './asset-logo.component';


@NgModule({
  declarations: [AssetLogoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AssetLogoComponent]
})
export class AssetLogoModule { }
