import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MembersComponent } from './members.component';
import { LoadingModule } from '../_components/loading/loading.module';
import { ErrorModule } from '../_components/error/error.module';
import { ContentItemModule } from '../_components/content-item/content-item.module';


@NgModule({
  declarations: [MembersComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ErrorModule,
    ContentItemModule,
    RouterModule.forChild([
      {
        path: '',
        component: MembersComponent
      }
    ])
  ]
})
export class MembersModule { }
