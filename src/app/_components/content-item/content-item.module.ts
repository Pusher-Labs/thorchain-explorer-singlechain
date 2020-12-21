import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItemComponent } from './content-item.component';


@NgModule({
  declarations: [ContentItemComponent],
  imports: [
    CommonModule
  ],
  exports: [ContentItemComponent]
})
export class ContentItemModule { }
