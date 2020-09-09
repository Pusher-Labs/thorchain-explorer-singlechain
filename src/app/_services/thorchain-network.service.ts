import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export enum THORChainNetwork {
  TESTNET = 'TESTNET',
  CHAOSNET = 'CHAOSNET'
}

@Injectable({
  providedIn: 'root'
})
export class ThorchainNetworkService {

  // tslint:disable-next-line:variable-name
  private _networkUpdated = new Subject<THORChainNetwork>();
  midgardBasePath: string;
  nodeBasePath: string;
  networkUpdated$ = this._networkUpdated.asObservable();
  network: THORChainNetwork;

  constructor() {
    this.setNetwork(THORChainNetwork.CHAOSNET);
  }

  setNetwork(network: THORChainNetwork) {

    switch (network) {
      case THORChainNetwork.TESTNET:
        this.midgardBasePath = 'https://midgard.bepswap.com';
        this.nodeBasePath = (isDevMode()) ? 'http://44.235.130.167:1317' : 'https://a2wva4alb6.execute-api.us-east-1.amazonaws.com/dev/thornode';
        this.network = network;
        break;

    /**
     * Right now default is CHAOSNET
     */
      default:
        this.midgardBasePath = 'https://chaosnet-midgard.bepswap.com';
        this.nodeBasePath = (isDevMode()) ? 'http://44.235.130.167:1317' : 'https://a2wva4alb6.execute-api.us-east-1.amazonaws.com/dev/thornode';
        this.network = network;
        break;
    }

    this._networkUpdated.next(network);

  }



}
