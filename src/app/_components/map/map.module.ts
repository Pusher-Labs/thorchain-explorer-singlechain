import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [MapComponent]
})
export class MapModule { }
