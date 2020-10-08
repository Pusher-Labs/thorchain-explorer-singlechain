import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionService, TransactionIndexParams } from '../_services/transaction.service';
import { Transaction } from '../_classes/transaction';
import { Subscription } from 'rxjs';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {

  address: string;
  offset: number;
  transactions: Transaction[];
  subs: Subscription[];
  error: string;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router,
    private thorchainNetworkService: ThorchainNetworkService) {
      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {
          const queryParams: Params = { offset: String(this.offset) };

          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams,
              queryParamsHandling: 'merge',
            }
          );

          this.transactions = null;

          this.getAddressTransactions();
        }
      );

      this.subs = [network$];
    }

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

    this.error = null;

    const params: TransactionIndexParams = {
      offset: this.offset,
      address: this.address
    };

    this.transactionService.index(params).subscribe(
      (res) => {
        this.transactions = res.txs;
        if (this.transactions.length <= 0) {
          this.error = 'No transactions found associated with this address';
        }
      },
      (err) => {
        console.error('error fetching members: ', err);
        this.error = 'Something went wrong fetching address transactions';
      }
    );

  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
