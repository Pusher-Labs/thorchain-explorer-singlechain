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
  transactions: Transaction[];

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

  async getTransaction() {

    const params: TransactionIndexParams = {
      offset: 0,
      txid: this.txid
    };

    this.transactionService.index(params).subscribe(
      (res) => {
        this.transactions = res.txs;
        console.log(this.transactions);
      },
      (err) => console.error('error fetching stakers: ', err)
    );

  }

}
