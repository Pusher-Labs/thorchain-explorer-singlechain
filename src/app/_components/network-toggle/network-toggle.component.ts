import { Component, OnInit } from '@angular/core';
import { ThorchainNetworkService, THORChainNetwork } from 'src/app/_services/thorchain-network.service';

@Component({
  selector: 'app-network-toggle',
  templateUrl: './network-toggle.component.html',
  styleUrls: ['./network-toggle.component.scss']
})
export class NetworkToggleComponent implements OnInit {

  network: THORChainNetwork;
  isTestnet: boolean;

  constructor(private thorchainNetworkService: ThorchainNetworkService) {
    this.thorchainNetworkService.networkUpdated$.subscribe(
      (network) => {
        this.network = network;
        this.isTestnet = (network === THORChainNetwork.TESTNET) ? true : false;
      }
    );
  }

  ngOnInit(): void {
  }

  toggleNetwork() {
    const update = (this.network === THORChainNetwork.TESTNET) ? THORChainNetwork.CHAOSNET : THORChainNetwork.TESTNET;

    this.thorchainNetworkService.setNetwork(update);
  }

}
