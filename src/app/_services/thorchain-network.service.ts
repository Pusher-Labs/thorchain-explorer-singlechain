import { HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Subject } from 'rxjs';

export enum THORChainNetwork {
  TESTNET = 'TESTNET',
  MULTICHAIN_TESTNET = 'MULTICHAIN_TESTNET',
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
  nodeReqParams: HttpParams;

  constructor() { }

  setNetwork(network: THORChainNetwork) {

    const proxy = 'https://a2wva4alb6.execute-api.us-east-1.amazonaws.com/dev/thornode';

    switch (network) {
      case THORChainNetwork.TESTNET:
        this.midgardBasePath = 'https://midgard.bepswap.com';
        this.nodeBasePath = (isDevMode()) ? 'http://44.235.130.167:1317' : proxy;
        this.network = network;
        this.nodeReqParams = new HttpParams().set('network', THORChainNetwork.TESTNET);
        break;

      case THORChainNetwork.MULTICHAIN_TESTNET:
        this.midgardBasePath = 'https://testnet.multichain.midgard.thorchain.info';
        this.nodeBasePath = (isDevMode()) ? 'http://18.158.236.117:1317' : proxy;
        this.network = network;
        this.nodeReqParams = new HttpParams().set('network', THORChainNetwork.MULTICHAIN_TESTNET);
        break;

    /**
     * Right now default is CHAOSNET
     */
      default:
        this.midgardBasePath = 'https://chaosnet-midgard.bepswap.com';
        this.nodeBasePath = (isDevMode()) ? 'http://18.159.173.48:1317' : proxy;
        this.network = network;
        this.nodeReqParams = new HttpParams().set('network', THORChainNetwork.CHAOSNET);
        break;
    }

    this._networkUpdated.next(network);

  }



}
