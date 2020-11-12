import { Component, OnInit } from '@angular/core';
import { ThorchainNetworkService, THORChainNetwork } from 'src/app/_services/thorchain-network.service';

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
    this.network = THORChainNetwork.CHAOSNET;
  }

  ngOnInit(): void {
  }

}
