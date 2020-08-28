import { Component, OnInit } from '@angular/core';
import { ConstantsService, MidgardConstants, StringDictionary } from 'src/app/_services/constants.service';
import { ConstantTableItem } from 'src/app/_classes/constants-table';

@Component({
  selector: 'app-constants',
  templateUrl: './constants.component.html',
  styleUrls: ['./constants.component.scss']
})
export class ConstantsComponent implements OnInit {

  constants: MidgardConstants;
  int64Vals: ConstantTableItem<number>[];
  stringVals: ConstantTableItem<string>[];
  boolVals: ConstantTableItem<boolean>[];

  constructor(private constantsService: ConstantsService) { }

  ngOnInit(): void {
    this.getConstants();
  }

  getConstants() {
    this.constantsService.getConstants().subscribe(
      (res) => {
        console.log('got some constants...');
        this.constants = res;
        this.getMimirOverrides(this.constants);
      }
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

}
