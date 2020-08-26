import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';
import { SearchComponent } from './_components/search/search.component';

/**
 * Services
 */
import { AssetService } from './_services/asset.service';
import { ConstantsService } from './_services/constants.service';
import { NetworkService } from './_services/network.service';
import { NodeService } from './_services/node.service';
import { PoolService } from './_services/pool.service';
import { StakerService } from './_services/staker.service';
import { StatsService } from './_services/stats.service';
import { TransactionService } from './_services/transaction.service';
import { VersionService } from './_services/version.service';
import { VolumeService } from './_services/volume.service';
import { UiStyleToggleService } from './_services/ui-style-toggle.service';
import { LocalStorageService } from './_services/local-storage.service';

/**
 * External
 */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighchartsChartModule } from 'highcharts-angular';

export function themeFactory(themeService: UiStyleToggleService) {
  return () => themeService.setThemeOnStart();
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HighchartsChartModule
  ],
  providers: [
    AssetService,
    ConstantsService,
    NetworkService,
    NodeService,
    PoolService,
    StakerService,
    StatsService,
    TransactionService,
    VersionService,
    VolumeService,
    UiStyleToggleService,
    LocalStorageService,
    {provide: APP_INITIALIZER, useFactory: themeFactory, deps: [UiStyleToggleService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
