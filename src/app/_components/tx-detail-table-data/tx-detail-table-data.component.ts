import { Component, OnInit, Input } from '@angular/core';
import { TransactionDetail } from '../../_classes/transaction';

export enum CoveredAssets {
  AVA   = 'AVA',
  AWC   = 'AWC',
  BNB   = 'BNB',
  BUSD  = 'BUSD',
  ERD   = 'ERD',
  MATIC = 'MATIC',
  RUNE  = 'RUNE',
  XRP   = 'XRP',
}

@Component({
  selector: 'app-tx-detail-table-data',
  templateUrl: './tx-detail-table-data.component.html',
  styleUrls: ['./tx-detail-table-data.component.scss']
})
export class TxDetailTableDataComponent implements OnInit {

  @Input() transactionDetail: TransactionDetail;
  @Input() direction: 'IN' | 'OUT';

  constructor() { }

  ngOnInit(): void {
  }

  matchIcon(assetPool: string): string {

    const asset = this.getAsset(assetPool);

    switch (asset) {

      case CoveredAssets.AVA:
        return 'assets/images/token-icons/awc.png';

      case CoveredAssets.AWC:
        return 'assets/images/token-icons/awc.png';

      case CoveredAssets.BNB:
        return 'assets/images/token-icons/bnb.png';

      case CoveredAssets.BUSD:
        return 'assets/images/token-icons/busd.png';

      case CoveredAssets.ERD:
        return 'assets/images/token-icons/erd.png';

      case CoveredAssets.MATIC:
        return 'assets/images/token-icons/matic.png';

      case CoveredAssets.RUNE:
        return 'assets/images/token-icons/rune.png';

      case CoveredAssets.XRP:
        return 'assets/images/token-icons/xrp.png';

      default:
        return 'assets/images/token-icons/unknown.png';

    }

  }

  isKnownAsset(assetPool: string): boolean {

    const asset = this.getAsset(assetPool);

    switch (asset) {

      case CoveredAssets.AVA:
      case CoveredAssets.AWC:
      case CoveredAssets.BNB:
      case CoveredAssets.BUSD:
      case CoveredAssets.ERD:
      case CoveredAssets.MATIC:
      case CoveredAssets.RUNE:
      case CoveredAssets.XRP:
        return true;

      default:
        console.error('unknown asset for: ', assetPool);
        return false;

    }

  }

  getAsset(assetPool: string): string {
    const split = assetPool.split('.');

    const assetWithId = split[split.length - 1];

    const asset = assetWithId.split('-');

    return asset[0];
  }

}
