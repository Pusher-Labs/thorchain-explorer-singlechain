import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThorNodeDTO } from '../_classes/thor-node';
import { ThorchainNetworkService, THORChainNetwork } from './thorchain-network.service';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  findAll(): Observable<ThorNodeDTO[]> {

    let params = new HttpParams();

    if (this.thorchainNetworkService.network === THORChainNetwork.TESTNET) {
      params = params.set('network', THORChainNetwork.TESTNET);
    }

    return this.http.get<ThorNodeDTO[]>(`${this.thorchainNetworkService.nodeBasePath}/thorchain/nodeaccounts`, {params});
  }

  findOne(address: string): Observable<ThorNodeDTO> {

    let params = new HttpParams();

    if (this.thorchainNetworkService.network === THORChainNetwork.TESTNET) {
      params = params.set('network', THORChainNetwork.TESTNET);
    }

    return this.http.get<ThorNodeDTO>(`${this.thorchainNetworkService.nodeBasePath}/thorchain/nodeaccount/${address}`, {params});
  }


}
