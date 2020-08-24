import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeComponent } from './volume.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [VolumeComponent],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [VolumeComponent]
})
export class VolumeModule { }
