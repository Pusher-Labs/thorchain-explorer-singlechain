import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '../../_classes/asset';

@Component({
  selector: 'app-asset-logo',
  templateUrl: './asset-logo.component.html',
  styleUrls: ['./asset-logo.component.scss']
})
export class AssetLogoComponent implements OnInit {

  @Input() assetPool: string;
  asset: Asset;

  constructor() {}

  ngOnInit(): void {

    if (this.assetPool) {
      this.asset = new Asset(this.assetPool);
    } else {
      console.error('no asset pool provided!');
    }

  }
}
