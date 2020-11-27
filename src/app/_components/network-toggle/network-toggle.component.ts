import { Component, OnInit } from '@angular/core';
import { ThorchainNetworkService, THORChainNetwork } from 'src/app/_services/thorchain-network.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-network-toggle',
  templateUrl: './network-toggle.component.html',
  styleUrls: ['./network-toggle.component.scss']
})
export class NetworkToggleComponent implements OnInit {

  set network(network: THORChainNetwork) {
    this._network = network;
    this.thorchainNetworkService.setNetwork(network);
  }
  get network() {
    return this._network;
  }
  _network: THORChainNetwork;

  constructor(private thorchainNetworkService: ThorchainNetworkService) {

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

}
