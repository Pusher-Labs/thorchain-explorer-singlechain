import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeComponent } from './volume.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [VolumeComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [VolumeComponent]
})
export class VolumeModule { }
