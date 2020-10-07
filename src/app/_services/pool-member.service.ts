import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoolMember } from '../_classes/pool-member';
import { ThorchainNetworkService, THORChainNetwork } from './thorchain-network.service';

@Injectable({
  providedIn: 'root'
})
export class PoolMemberService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  findAll(asset: string): Observable<PoolMember[]> {

    let params = new HttpParams();

    if (this.thorchainNetworkService.network === THORChainNetwork.TESTNET) {
      params = params.set('network', THORChainNetwork.TESTNET);
    }

    return this.http.get<PoolMember[]>(`${this.thorchainNetworkService.nodeBasePath}/thorchain/pool/${asset}/stakers`, {params});
  }
}
