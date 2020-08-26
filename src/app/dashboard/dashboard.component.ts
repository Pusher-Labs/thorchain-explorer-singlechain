import { Component, OnInit } from '@angular/core';
import { StatsService, GlobalStats } from '../_services/stats.service';
import { TransactionService, TransactionIndexParams } from '../_services/transaction.service';
import { Transaction } from '../_classes/transaction';
import { NetworkStatus, NetworkService } from '../_services/network.service';
import { NodeService } from '../_services/node.service';
import { ThorNode } from '../_classes/thor-node';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: GlobalStats;
  transactions: Transaction[];
  network: NetworkStatus;
  assets: string[];
  nodes: ThorNode[];

  constructor(
    private statsService: StatsService,
    private transactionService: TransactionService,
    private networkService: NetworkService,
    private nodeService: NodeService
  ) { }

  ngOnInit(): void {
    /**
     * Temporarily removed bc this call frequently times out
     */
    // this.getGlobalStats();

    this.getTransactions();
    this.getNetworkStatus();
    this.getNodes();
  }

  getGlobalStats(): void {

    this.statsService.getStats().subscribe(
      (res) => this.stats = res,
      (err) => console.error(err)
    );

  }

  getTransactions() {

    const params: TransactionIndexParams = {
      offset: 0
    };

    this.transactionService.index(params).subscribe(
      (res) => {
        this.transactions = res.txs;
      },
      (err) => console.error('error fetching stakers: ', err)
    );
  }

  getNetworkStatus() {
    this.networkService.network().subscribe(
      (res) => this.network = res,
      (err) => console.error('error fetching network status: ', err)
    );
  }

  getNodes() {
    this.nodeService.findAll().subscribe(
      (res) => this.nodes = res,
      (err) => console.error('error on dashboard fetching nodes: ', err)
    );

  }

}
