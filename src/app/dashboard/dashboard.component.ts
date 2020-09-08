import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatsService } from '../_services/stats.service';
import { TransactionService, TransactionIndexParams } from '../_services/transaction.service';
import { Transaction } from '../_classes/transaction';
import { NetworkService } from '../_services/network.service';
import { NetworkStatus } from '../_classes/network-status';
import { NodeService } from '../_services/node.service';
import { ThorNode } from '../_classes/thor-node';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';
import { CoinGeckoService } from '../_services/coingecko.service';
import { Subscription } from 'rxjs';
import { GlobalStats } from '../_classes/global-stats';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  stats: GlobalStats;
  transactions: Transaction[];
  network: NetworkStatus;
  assets: string[];
  nodes: ThorNode[];
  subs: Subscription[];
  error: string;
  currentRate: number;

  constructor(
    private statsService: StatsService,
    private transactionService: TransactionService,
    private networkService: NetworkService,
    private nodeService: NodeService,
    private thorchainNetworkService: ThorchainNetworkService,
    private coinGeckoService: CoinGeckoService
  ) {
    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
      (_) => {
        this.fetchData();
      }
    );

    this.subs = [network$];
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.error = null;

    this.fetchCurrentPrice();
    this.getGlobalStats();
    this.getTransactions();
    this.getNetworkStatus();
    this.getNodes();
  }

  fetchCurrentPrice() {
    this.coinGeckoService.getCurrencyConversion().subscribe(
      (res) => {
        if (res.thorchain && res.thorchain.usd) {
          this.currentRate = res.thorchain.usd;
        }
      },
      (err) => console.error('error fetching current price: ', err)
    );
  }

  getGlobalStats(): void {

    this.stats = null;

    this.statsService.getStats().subscribe(
      (res) => this.stats = new GlobalStats(res),
      (err) => {
        console.error(err);
        this.error = `Error Connecting to THORChain ${this.thorchainNetworkService.network}`;
      }
    );

  }

  getTransactions() {

    this.transactions = null;

    const params: TransactionIndexParams = {
      offset: 0
    };

    this.transactionService.index(params).subscribe(
      (res) => {
        this.transactions = res.txs;
      },
      (err) => {
        console.error('error fetching stakers: ', err);
        this.error = `Error Connecting to THORChain ${this.thorchainNetworkService.network}`;
      }
    );
  }

  getNetworkStatus() {

    this.network = null;

    this.networkService.network().subscribe(
      (res) => {
        this.network = new NetworkStatus(res);
      },
      (err) => {
        console.error('error fetching network status: ', err);
        this.error = `Error Connecting to THORChain ${this.thorchainNetworkService.network}`;
      }
    );
  }

  getNodes() {
    this.nodes = null;
    this.nodeService.findAll().subscribe(
      (res) => {
        this.nodes = res.map( dto => new ThorNode(dto));
      },
        (err) => {
          console.error('error on dashboard fetching nodes: ', err);
          this.error = `Error Connecting to THORChain ${this.thorchainNetworkService.network}`;
        }
    );

  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
