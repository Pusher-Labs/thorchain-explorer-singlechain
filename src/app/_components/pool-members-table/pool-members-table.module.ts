import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolMembersTableComponent } from './pool-members-table.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../_pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ContentItemModule } from '../content-item/content-item.module';

@NgModule({
  declarations: [PoolMembersTableComponent],
  imports: [
    CommonModule,
    PipesModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ChartsModule,
    ContentItemModule
  ],
  exports: [PoolMembersTableComponent]
})
export class PoolMembersTableModule { }
