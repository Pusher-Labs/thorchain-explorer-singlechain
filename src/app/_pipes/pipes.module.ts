import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUnitsPipe } from './asset-units.pipe';


@NgModule({
  declarations: [AssetUnitsPipe],
  imports: [
    CommonModule
  ],
  exports: [AssetUnitsPipe]
})
export class PipesModule { }
