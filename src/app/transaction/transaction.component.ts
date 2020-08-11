import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionIndexParams, TransactionService } from '../_services/transaction.service';
import { Transaction } from '../_classes/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  txid: string;
  transaction: Transaction;
  error: string;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService) {
    this.txid = '';
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe( (params) => {

      const txid = params.get('id');
      this.txid = txid;

      this.getTransaction();

    });

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

}
