import { Component, OnInit } from '@angular/core';
import { TransactionService, TransactionIndexParams } from '../_services/transaction.service';
import { Transaction } from '../_classes/transaction';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TransactionType } from '../_const/transaction-type.enum';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[];
  offset: number;
  limit: number;
  asset: string;
  address: string;
  txid: string;
  type: TransactionType[];
  totalCount: number;
  selectedTypes: {
    [TransactionType.ADD]: boolean,
    [TransactionType.DOUBLE_SWAP]: boolean,
    [TransactionType.REFUND]: boolean,
    [TransactionType.STAKE]: boolean,
    [TransactionType.SWAP]: boolean,
    [TransactionType.UNSTAKE]: boolean,
  };

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.limit = this.transactionService.limit;
  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe( (params) => {

      const offset = params.get('offset');
      this.offset = offset ? +offset : 0;
      if (!offset) {

        const queryParams: Params = { offset: String(this.offset) };

        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          }
        );

      }

      const asset = params.get('asset');
      this.asset = asset ?? null;

      const address = params.get('address');
      this.address = address ?? null;

      const txid = params.get('txid');
      this.txid = txid ?? null;

      const type = params.get('type');
      if (!type) {
        this.selectedTypes = {
          [TransactionType.ADD]: true,
          [TransactionType.DOUBLE_SWAP]: true,
          [TransactionType.REFUND]: true,
          [TransactionType.STAKE]: true,
          [TransactionType.SWAP]: true,
          [TransactionType.UNSTAKE]: true,
        };
      } else {
        this.selectedTypes = this.setSelectedTypes(type);
      }

      this.getTransactions();


    });

  }

  async getTransactions() {

    const params: TransactionIndexParams = {
      offset: this.offset
    };

    if (this.address) {
      params.asset = this.asset;
    }

    if (this.address) {
      params.address = this.address;
    }

    if (this.txid) {
      params.txid = this.txid;
    }

    params.type = this.filterTypes();

    this.transactionService.index(params).subscribe(
      (res) => {
        this.transactions = res.txs;
        this.totalCount = res.count;
        console.log(this.transactions);
      },
      (err) => console.error('error fetching stakers: ', err)
    );

  }

  setTypes(queryParam: string): TransactionType[] {

    return queryParam.split(',').map( (typeString) => TransactionType[typeString] );

  }

  setPage(offset: number) {

    this.offset = offset;

    const queryParams: Params = { offset: String(this.offset)};

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );

  }

  getLastPageOffset(): number {
    return Math.floor(this.totalCount / this.limit) * this.limit;
  }

  setSelectedTypes(queryParam: string) {

    const split = queryParam.split(',').filter( (str) => str.length > 0 );

    return {
      [TransactionType.ADD]: split.includes(TransactionType.ADD),
      [TransactionType.DOUBLE_SWAP]: split.includes(TransactionType.DOUBLE_SWAP),
      [TransactionType.REFUND]: split.includes(TransactionType.REFUND),
      [TransactionType.STAKE]: split.includes(TransactionType.STAKE),
      [TransactionType.SWAP]: split.includes(TransactionType.SWAP),
      [TransactionType.UNSTAKE]: split.includes(TransactionType.UNSTAKE),
    };

  }

  filterType() {

    const queryParams: Params = { offset: String(0), type: this.createTypesString()};

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );

  }

  createTypesString(): string {

    let str = '';

    for (const [key, value] of Object.entries(this.selectedTypes)) {
      if (value === true) {
        str += `${key},`;
      }
    }

    return str;
  }

  filterTypes(): TransactionType[] {

    const types: TransactionType[] = [];

    if (this.selectedTypes[TransactionType.ADD]) {
      types.push(TransactionType.ADD);
    }

    if (this.selectedTypes[TransactionType.DOUBLE_SWAP]) {
      types.push(TransactionType.DOUBLE_SWAP);
    }

    if (this.selectedTypes[TransactionType.REFUND]) {
      types.push(TransactionType.REFUND);
    }

    if (this.selectedTypes[TransactionType.STAKE]) {
      types.push(TransactionType.STAKE);
    }

    if (this.selectedTypes[TransactionType.SWAP]) {
      types.push(TransactionType.SWAP);
    }

    if (this.selectedTypes[TransactionType.UNSTAKE]) {
      types.push(TransactionType.UNSTAKE);
    }

    return types;

  }

}
