import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionService, TransactionIndexParams } from '../_services/transaction.service';
import midgard from '@thorchain/asgardex-midgard';
import { Transaction } from '../_classes/transaction';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  address: string;
  offset: number;
  transactions: Transaction[];

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe( (params) => {

      const address = params.get('address');
      this.address = address;


      const offset = params.get('offset');
      this.offset = offset ? +offset : 0;
      if (!offset) {

        const queryParams: Params = { offset: String(this.offset) };

        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge',
          }
        );

      }

      this.getAddressTransactions();

    });

  }

  async getAddressTransactions() {
    const baseUrl = await midgard();

    const params: TransactionIndexParams = {
      offset: this.offset,
      address: this.address
    };

    this.transactionService.index(baseUrl, params).subscribe(
      (res) => this.transactions = res.txs,
      (err) => console.error('error fetching stakers: ', err)
    );

  }

}
