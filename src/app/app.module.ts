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
import { BreadcrumbComponent } from './_components/breadcrumb/breadcrumb.component';
import { SearchComponent } from './_components/search/search.component';
import { NetworkToggleComponent } from './_components/network-toggle/network-toggle.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { ExplorerUiComponent } from './explorer-ui/explorer-ui.component';
import { QueryInputComponent } from './query-input/query-input.component';
import { ResponseLinksComponent } from './response-links/response-links.component';

/**
 * Services
 */
import { AssetService } from './_services/asset.service';
import { CoinGeckoService } from './_services/coingecko.service';
import { ConstantsService } from './_services/constants.service';
import { LastBlockService } from './_services/last-block.service';
import { LocalStorageService } from './_services/local-storage.service';
import { NetworkService } from './_services/network.service';
import { NodeService } from './_services/node.service';
import { PoolService } from './_services/pool.service';
import { MemberService } from './_services/member.service';
import { StatsService } from './_services/stats.service';
import { TransactionService } from './_services/transaction.service';
import { UiStyleToggleService } from './_services/ui-style-toggle.service';
import { ThorchainNetworkService } from './_services/thorchain-network.service';
import { VersionService } from './_services/version.service';
import { VolumeService } from './_services/volume.service';

/**
 * External
 */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


export function themeFactory(themeService: UiStyleToggleService) {
  return () => themeService.setThemeOnStart();
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    BreadcrumbComponent,
    NetworkToggleComponent,
    ExplorerComponent,
    ExplorerUiComponent,
    QueryInputComponent,
    ResponseLinksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ThorchainNetworkService,
    AssetService,
    ConstantsService,
    NetworkService,
    NodeService,
    LastBlockService,
    PoolService,
    MemberService,
    StatsService,
    TransactionService,
    VersionService,
    VolumeService,
    UiStyleToggleService,
    LocalStorageService,
    CoinGeckoService,
    {provide: APP_INITIALIZER, useFactory: themeFactory, deps: [UiStyleToggleService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
