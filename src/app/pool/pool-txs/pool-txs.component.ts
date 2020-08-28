import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from 'src/app/_classes/transaction';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionIndexParams, TransactionService } from 'src/app/_services/transaction.service';
import { Subscription } from 'rxjs';
import { ThorchainNetworkService } from 'src/app/_services/thorchain-network.service';

@Component({
  selector: 'app-pool-txs',
  templateUrl: './pool-txs.component.html',
  styleUrls: ['./pool-txs.component.scss']
})
export class PoolTxsComponent implements OnInit, OnDestroy {

  offset: number;
  limit: number;
  transactions: Transaction[];
  totalCount: number;
  poolName: string;
  subs: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionService,
    private router: Router,
    private thorchainNetworkService: ThorchainNetworkService) {
      this.limit = this.transactionsService.limit;

      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {

          const queryParams: Params = { offset: String(0)};

          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams,
              queryParamsHandling: 'merge',
            }
          );

          this.transactions = null;
          this.getAssetTransactions();

        }
      );

      this.subs = [network$];

  }

  ngOnInit(): void {

    const queryParams$ = this.route.parent.queryParamMap.subscribe( (params) => {

      const offset = params.get('offset');
      this.offset = offset ? +offset : 0;

    });

    const params$ = this.route.parent.paramMap.subscribe( async (params) => {

      this.poolName = params.get('pool');
      this.getAssetTransactions();

    });

    this.subs.push(queryParams$, params$);

  }

  async getAssetTransactions() {

    const params: TransactionIndexParams = {
      offset: this.offset,
      asset: this.poolName
    };
    this.transactionsService.index(params).subscribe(
      (res) => {
        this.totalCount = res.count;
        this.transactions = res.txs;
      },
      (err) => console.error('err is: ', err)
    );
  }

  setPage(offset: number) {

    this.offset = offset;

    const queryParams: Params = { offset: String(this.offset)};

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      }
    );
    this.getAssetTransactions();

  }

  getLastPageOffset(): number {
    return Math.floor(this.totalCount / this.limit) * this.limit;
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
