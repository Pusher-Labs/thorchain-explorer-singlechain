import { Component, OnInit, Input } from '@angular/core';
import { CoveredAssets } from '../../_const/covered-assets.enum';

@Component({
  selector: 'app-asset-logo',
  templateUrl: './asset-logo.component.html',
  styleUrls: ['./asset-logo.component.scss']
})
export class AssetLogoComponent implements OnInit {

  @Input() assetPool: string;
  asset: string;
  assetImgPath: string;
  isKnownAsset: boolean;

  constructor() {}

  ngOnInit(): void {

    if (this.assetPool) {
      this.asset = this.setAsset();
      this.assetImgPath = this.matchIcon();
      this.isKnownAsset = this.setIsKnownAsset();
    } else {
      console.error('no asset pool provided!');
    }

  }

  matchIcon(): string {

    switch (this.asset) {

      case CoveredAssets.AVA:
        return 'assets/images/token-icons/ava.png';

      case CoveredAssets.AWC:
        return 'assets/images/token-icons/awc.png';

      case CoveredAssets.BNB:
        return 'assets/images/token-icons/bnb.png';

      case CoveredAssets.BUSD:
        return 'assets/images/token-icons/busd.png';

      case CoveredAssets.BTCB:
        return 'assets/images/token-icons/btc.png';

      case CoveredAssets.ERD:
        return 'assets/images/token-icons/erd.png';

      case CoveredAssets.ETH:
        return 'assets/images/token-icons/eth.png';

      case CoveredAssets.FTM:
        return 'assets/images/token-icons/ftm.png';

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

  setIsKnownAsset(): boolean {

    switch (this.asset) {

      case CoveredAssets.AVA:
      case CoveredAssets.AWC:
      case CoveredAssets.BNB:
      case CoveredAssets.BTCB:
      case CoveredAssets.BUSD:
      case CoveredAssets.ERD:
      case CoveredAssets.ETH:
      case CoveredAssets.FTM:
      case CoveredAssets.MATIC:
      case CoveredAssets.RUNE:
      case CoveredAssets.XRP:
        return true;

      default:
        console.log('unknown asset for: ', this.assetPool);
        return false;

    }

  }

  setAsset(): string {

    if (this.assetPool) {
      const split = this.assetPool.split('.');

      const assetWithId = split[split.length - 1];

      const asset = assetWithId.split('-');

      return asset[0];
    } else {
      console.error('no asset pool!!');
      return null;
    }

  }

}
