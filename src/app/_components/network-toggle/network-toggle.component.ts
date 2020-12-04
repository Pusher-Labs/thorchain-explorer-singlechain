import { Component, Inject, OnInit } from '@angular/core';
import { THORChainNetwork } from 'src/app/_services/thorchain-network.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-network-toggle',
  templateUrl: './network-toggle.component.html',
  styleUrls: ['./network-toggle.component.scss']
})
export class NetworkToggleComponent implements OnInit {

  set network(network: THORChainNetwork) {
    if (!this._network || this.network && this.network === network) {
      console.log('setting network: ', network);
      this._network = network;
    } else {
      this.navigateToRoute(network);
    }

  }
  get network() {
    return this._network;
  }
  _network: THORChainNetwork;

  constructor(@Inject(DOCUMENT) private document: Document) {

    switch (environment.network) {
      case 'TESTNET':
        this.network = THORChainNetwork.TESTNET;
        break;

      case 'MULTICHAIN_TESTNET':
        this.network = THORChainNetwork.MULTICHAIN_TESTNET;
        break;

      default:
        this.network = THORChainNetwork.CHAOSNET;
        break;
    }

  }

  ngOnInit(): void {
  }

  navigateToRoute(network: THORChainNetwork) {

    console.log('navigate to route hit: ', network);

    switch (network) {
      case 'TESTNET':
        console.log('TESTNET');
        this.document.location.href = 'https://testnet.thorchain.net/';
        break;

      case 'MULTICHAIN_TESTNET':
        console.log('MULTICHAIN_TESTNET');
        this.document.location.href = 'https://multichain-testnet.thorchain.net/';
        break;

      default:
        console.log('DEFAULT');
        this.document.location.href = 'https://thorchain.net/';
        break;
    }
  }

}
