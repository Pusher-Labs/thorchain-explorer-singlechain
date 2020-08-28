import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionIndexParams, TransactionService } from '../_services/transaction.service';
import { Transaction } from '../_classes/transaction';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnDestroy {

  txid: string;
  transaction: Transaction;
  error: string;
  subs: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private thorchainNetworkService: ThorchainNetworkService) {
      this.txid = '';

      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {
          this.transaction = null;
          this.getTransaction();
        }
      );

      this.subs = [network$];

  }

  ngOnInit(): void {

    const params$ = this.route.paramMap.subscribe( (params) => {

      const txid = params.get('id');
      this.txid = txid;

      this.getTransaction();

    });

    this.subs.push(params$);

  }

  getTransaction(): void {

    const params: TransactionIndexParams = {
      offset: 0,
      txid: this.txid
    };

    this.transactionService.index(params).subscribe(
      (res) => {

        if (res.txs != null && res.txs.length > 0) {
          this.transaction = res.txs[0];
        } else {
          this.error = 'Sorry, no transaction with that ID was found 😕';
        }

      },
      (err) => console.error('error fetching transaction: ', err)
    );

  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
