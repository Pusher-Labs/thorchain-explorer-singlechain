export class FormattableAsset {

  formatAssetUnits(value: number, unit: number): number {
    return value / 10 ** unit;
  }

}
