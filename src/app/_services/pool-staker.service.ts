import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoolStaker } from '../_classes/pool-staker';
import { ThorchainNetworkService, THORChainNetwork } from './thorchain-network.service';

@Injectable({
  providedIn: 'root'
})
export class PoolStakerService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  findAll(asset: string): Observable<PoolStaker[]> {

    let params = new HttpParams();

    if (this.thorchainNetworkService.network === THORChainNetwork.TESTNET) {
      params = params.set('network', THORChainNetwork.TESTNET);
    }

    return this.http.get<PoolStaker[]>(`${this.thorchainNetworkService.nodeBasePath}/thorchain/pool/${asset}/stakers`, {params});
  }
}
