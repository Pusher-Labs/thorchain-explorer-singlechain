import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ThorchainNetworkService, THORChainNetwork } from './thorchain-network.service';
import { Observable } from 'rxjs';

export interface LastBlock {
  chain: string;
  lastobservedin: string;
  lastsignedout: string;
  thorchain: string;
}

@Injectable({
  providedIn: 'root'
})
export class LastBlockService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  getLastBlock(): Observable<LastBlock> {
    return this.http.get<LastBlock>(
      `${this.thorchainNetworkService.nodeBasePath}/thorchain/lastblock`,
      {params: this.thorchainNetworkService.nodeReqParams}
    );
  }

}
