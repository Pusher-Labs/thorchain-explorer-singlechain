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

  // network: THORChainNetwork;
  private _network = new Subject<THORChainNetwork>();
  midgardBasePath: string;
  nodeBasePath: string;
  network$ = this._network.asObservable();

  constructor() {
    this.setNetwork(THORChainNetwork.CHAOSNET);
  }

  setNetwork(network: THORChainNetwork) {

    console.log('setting network to: ', network);
    console.log('isDevMode is: ', isDevMode());

    switch (network) {
      case THORChainNetwork.TESTNET:
        this.midgardBasePath = 'https://midgard.bepswap.com';
        this.nodeBasePath = (isDevMode()) ? 'http://195.248.242.140:1317' : 'https://a2wva4alb6.execute-api.us-east-1.amazonaws.com/dev/thornode';
        break;

    /**
     * Right now default is CHAOSNET
     **/
      default:
        this.midgardBasePath = 'https://chaosnet-midgard.bepswap.com';
        this.nodeBasePath = (isDevMode()) ? 'http://18.159.173.48:1317' : 'https://a2wva4alb6.execute-api.us-east-1.amazonaws.com/dev/thornode';
        break;
    }

    this._network.next(network);

  }



}
