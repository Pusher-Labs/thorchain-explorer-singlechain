import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConstantsService, MidgardConstants, StringDictionary } from 'src/app/_services/constants.service';
import { ConstantTableItem } from 'src/app/_classes/constants-table';
import { ThorchainNetworkService } from 'src/app/_services/thorchain-network.service';
import { Subscription } from 'rxjs';

enum ConstantType {
  INT64 = 'INT64',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN'
}

interface MimirTableItem {
  key: string;
  label: string;
  value: string;
  type: ConstantType;
}

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
  mimirVals: MimirTableItem[] = [];

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

        /**
         * Create an array of Mimir Overrides
         */
        this.mimirVals = this.createMimirsArray(res, constants);

        /**
         * Create Int64 Values
         */
        for (const [key, value] of Object.entries(constants.int_64_values)) {

          let formattedKey = key.match(/[A-Z][a-z]+/g).join(' ');

          /**
           * Is it a (Block)?
           */
          if (this.addBlockToKey(key)) {
            formattedKey += ' (Blocks)';
          }

          let formattedMimirValue;

          /**
           * See if Mimir Match is available
           */
          const mimirMatch =  this.mimirVals.find( (mimir) => mimir.key === key.toUpperCase() );

          /**
           * Should we format the number like num / 10 ** 8?
           */
          const formatNumber = this.formatNumber(key);

          /**
           * Format value if necessary
           */
          const formattedValue = (formatNumber === true)
          ? this.assetUnits(value)
          : value;

          if (mimirMatch) {
            formattedMimirValue = +(mimirMatch.value);
          }

          int64vals.push(new ConstantTableItem<number>(
            formattedKey,
            formattedValue,
            ((formattedMimirValue) ? formattedMimirValue : null)
          ));
        }

        /**
         * Create String Values
         */
        for (const [key, value] of Object.entries(constants.string_values)) {
          const mimirMatch =  this.mimirVals.find( (mimir) => mimir.key === key.toUpperCase() );
          const formattedKey = key.match(/[A-Z][a-z]+/g).join(' ');

          stringVals.push(new ConstantTableItem<string>(formattedKey, value, ((mimirMatch) ? mimirMatch.value : null) ));
        }

        /**
         * Create Boolean Values
         */
        for (const [key, value] of Object.entries(constants.bool_values)) {
          const mimirMatch =  this.mimirVals.find( (mimir) => mimir.key === key.toUpperCase() );
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

  createMimirsArray(mimirs: StringDictionary, constants: MidgardConstants): MimirTableItem[] {

    const mimirArr: MimirTableItem[] = [];

    for (const [key, _] of Object.entries(mimirs)) {
      const splitKey = key.replace('mimir//', '');
      let keyString = splitKey;
      let val = mimirs[key];
      let constantType: ConstantType;

      /**
       * Match Mimir to int64 constants
       */
      for (const [keys] of Object.entries(constants.int_64_values)) {
        if (keyString.localeCompare(keys.toUpperCase()) === 0) {
          keyString = keys.match(/[A-Z][a-z]+/g).join(' ');
          val = this.formatNumber(splitKey) ? String(this.assetUnits(+val)) : val;
          constantType = ConstantType.INT64;
        }

        /**
         * this is temporary for chaosnet
         */
        if (keyString === 'MAXIMUMSTAKERUNE') {
          keyString = 'Maximum Stake Rune';
          val = this.formatNumber(splitKey) ? String(this.assetUnits(+val)) : val;
          constantType = ConstantType.INT64;
        }
      }

      /**
       * Match Mimir to string constants
       */
      for (const [keys] of Object.entries(constants.string_values)) {
        if (keyString.localeCompare(keys.toUpperCase()) === 0) {
          keyString = keys.match(/[A-Z][a-z]+/g).join(' ');
          constantType = ConstantType.STRING;
        }
      }

      /**
       * Match Mimir to boolean constants
       */
      for (const [keys] of Object.entries(constants.bool_values)) {
        if (keyString.localeCompare(keys.toUpperCase()) === 0) {
          keyString = keys.match(/[A-Z][a-z]+/g).join(' ');
          constantType = ConstantType.BOOLEAN;
        }
      }


      mimirArr.push({ key: splitKey, label: keyString, value: val, type: constantType });
    }

    return mimirArr;
  }

  formatNumber(key: string): boolean {
    return (key === 'CliTxCost' || key === 'MinimumBondInRune' || key === 'TransactionFee' || key === 'MAXIMUMSTAKERUNE' || key === 'MINIMUMBONDINRUNE')
      ? true
      : false;
  }

  addBlockToKey(key: string): boolean {
    switch (key) {
      case 'BadValidatorRate':
      case 'DoubleSignMaxAge':
      case 'FundMigrationInterval':
      case 'JailTimeKeygen':
      case 'JailTimeKeysign':
      case 'NewPoolCycle':
      case 'ObserveFlex':
      case 'OldValidatorRate':
      case 'RotatePerBlockHeight':
      case 'RotateRetryBlocks':
      case 'SigningTransactionPeriod':
      case 'StakeLockUpBlocks':
        return true;

      default:
        return false;
    }
  }

  addDetail(key: string) {

    switch (key) {
      case 'Ygg Fund Limit':
        return '%';

      default:
        return '';
    }

  }

  assetUnits(num: number) {
    return num / 10 ** 8;
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
