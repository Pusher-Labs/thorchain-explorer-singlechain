import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
  name: 'assetUnits'
})
export class AssetUnitsPipe implements PipeTransform {

  transform(value: unknown, unit: number): unknown {

    const int = Number(value);
    console.log('int is: ', int);

    if (typeof int === 'number') {
      return int / 10 ** unit;
    } else {
      console.error(`error parsing ${value} into number`);
      return '-';
    }

    return null;
  }

}
