import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThorchainNetworkService } from './thorchain-network.service';
import { NetworkStatusDTO } from '../_classes/network-status';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  network(): Observable<NetworkStatusDTO> {
    return this.http.get<NetworkStatusDTO>(`${this.thorchainNetworkService.midgardBasePath}/v1/network`);
  }

}
