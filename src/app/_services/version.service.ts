import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThorchainNetworkService, THORChainNetwork } from './thorchain-network.service';

export interface VersionSummary {
  current: string;
  next: string;
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) {}

  fetch(network?: THORChainNetwork): Observable<VersionSummary> {

    let params = new HttpParams();

    if (network) {
      params = params.set('network', 'TESTNET');
    }

    return this.http.get<VersionSummary>(`${this.thorchainNetworkService.nodeBasePath}/thorchain/version`, {params});
  }

}
