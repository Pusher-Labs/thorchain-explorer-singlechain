import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { SearchComponent } from './_components/search/search.component';

/**
 * Services
 */
import { AssetService } from './_services/asset.service';
import { NodeService } from './_services/node.service';
import { PoolService } from './_services/pool.service';
import { StakerService } from './_services/staker.service';
import { StatsService } from './_services/stats.service';
import { TransactionService } from './_services/transaction.service';

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
    AssetService,
    NodeService,
    PoolService,
    StakerService,
    StatsService,
    TransactionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
