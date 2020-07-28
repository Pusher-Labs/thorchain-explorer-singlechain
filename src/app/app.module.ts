import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StakerService } from './_services/staker.service';
import { TransactionService } from './_services/transaction.service';
import { SearchComponent } from './_components/search/search.component';
import { AssetService } from './_services/asset.service';
import { PoolService } from './_services/pool.service';
import { StatsService } from './_services/stats.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    StakerService,
    TransactionService,
    AssetService,
    PoolService,
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
