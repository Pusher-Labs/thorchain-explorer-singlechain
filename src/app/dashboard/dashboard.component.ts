import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatsService, GlobalStats } from '../_services/stats.service';
import { TransactionService, TransactionIndexParams } from '../_services/transaction.service';
import { Transaction } from '../_classes/transaction';
import { NetworkStatus, NetworkService } from '../_services/network.service';
import { NodeService } from '../_services/node.service';
import { ThorNode } from '../_classes/thor-node';
import { ThorchainNetworkService, THORChainNetwork } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

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

  constructor(
    private statsService: StatsService,
    private transactionService: TransactionService,
    private networkService: NetworkService,
    private nodeService: NodeService,
    private thorchainNetworkService: ThorchainNetworkService
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

    this.getGlobalStats();
    this.getTransactions();
    this.getNetworkStatus();
    this.getNodes();
  }

  getGlobalStats(): void {

    this.stats = null;

    this.statsService.getStats().subscribe(
      (res) => this.stats = res,
      (err) => {
        console.error(err);
        this.error = `Error fetching ${this.thorchainNetworkService.network} data`;
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
        this.error = `Error fetching ${this.thorchainNetworkService.network} data`;
      }
    );
  }

  getNetworkStatus() {

    this.network = null;

    this.networkService.network().subscribe(
      (res) => this.network = res,
      (err) => {
        console.error('error fetching network status: ', err);
        this.error = `Error fetching ${this.thorchainNetworkService.network} data`;
      }
    );
  }

  getNodes() {
    this.nodes = null;
    this.nodeService.findAll().subscribe(
        (res) => this.nodes = res,
        (err) => {
          console.error('error on dashboard fetching nodes: ', err);
          this.error = `Error fetching ${this.thorchainNetworkService.network} data`;
        }
    );

  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
