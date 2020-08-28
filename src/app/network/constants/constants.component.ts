import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConstantsService, MidgardConstants, StringDictionary } from 'src/app/_services/constants.service';
import { ConstantTableItem } from 'src/app/_classes/constants-table';
import { ThorchainNetworkService } from 'src/app/_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-constants',
  templateUrl: './constants.component.html',
  styleUrls: ['./constants.component.scss']
})
export class ConstantsComponent implements OnInit, OnDestroy {

  int64Vals: ConstantTableItem<number>[];
  stringVals: ConstantTableItem<string>[];
  boolVals: ConstantTableItem<boolean>[];
  subs: Subscription[];

  constructor(private constantsService: ConstantsService, private thorchainNetworkService: ThorchainNetworkService) {
    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe((_) => this.getConstants());
    this.subs = [network$];
  }

  ngOnInit(): void {
    this.getConstants();
  }

  getConstants() {

    this.int64Vals = null;
    this.stringVals = null;
    this.boolVals = null;

    this.constantsService.getConstants().subscribe(
      (res) => this.getMimirOverrides(res),
      (err) => console.error('error fetching constants: ', err)
    );
  }

  getMimirOverrides(constants: MidgardConstants) {
    this.constantsService.getMimir().subscribe(
      (res) => {

        const int64vals: ConstantTableItem<number>[] = [];
        const stringVals: ConstantTableItem<string>[] = [];
        const boolVals: ConstantTableItem<boolean>[] = [];
        const mimirVals: {key: string, value: string}[] = [];

        /**
         * Create an array of Mimir Overrides
         */
        for (const [key, _] of Object.entries(res)) {
          const splitKey = key.replace('mimir//', '');
          mimirVals.push({key: splitKey, value: res[key] });
        }

        /**
         * Create Int64 Values
         */
        for (const [key, value] of Object.entries(constants.int_64_values)) {
          const mimirMatch =  mimirVals.find( (mimir) => mimir.key === key.toUpperCase() );
          const formattedKey = key.match(/[A-Z][a-z]+/g).join(' ');

          int64vals.push(new ConstantTableItem<number>(formattedKey, value, ((mimirMatch) ? +(mimirMatch.value) : null) ));
        }

        /**
         * Create String Values
         */
        for (const [key, value] of Object.entries(constants.string_values)) {
          const mimirMatch =  mimirVals.find( (mimir) => mimir.key === key.toUpperCase() );
          const formattedKey = key.match(/[A-Z][a-z]+/g).join(' ');

          stringVals.push(new ConstantTableItem<string>(formattedKey, value, ((mimirMatch) ? mimirMatch.value : null) ));
        }

        /**
         * Create Boolean Values
         */
        for (const [key, value] of Object.entries(constants.bool_values)) {
          const mimirMatch =  mimirVals.find( (mimir) => mimir.key === key.toUpperCase() );
          const formattedKey = key.match(/[A-Z][a-z]+/g).join(' ');

          boolVals.push(new ConstantTableItem<boolean>(formattedKey, value, ((mimirMatch) ? Boolean(mimirMatch.value) : null) ));
        }

        this.int64Vals = int64vals;
        this.stringVals = stringVals;
        this.boolVals = boolVals;
      },
      (err) => console.error('error fetching mimir...', err)
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
