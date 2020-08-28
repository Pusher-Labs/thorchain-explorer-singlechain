import { Injectable } from '@angular/core';
import { StakerDTO } from '../_classes/staker';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StakerPoolData } from '../_classes/staker-pool-data';
import { environment } from '../../environments/environment';
import { ThorchainNetworkService } from './thorchain-network.service';

@Injectable({
  providedIn: 'root'
})
export class StakerService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  findAll(): Observable<string[]> {

    return this.http.get<string[]>(`${this.thorchainNetworkService.midgardBasePath}/v1/stakers`);

  }

  findOne(address: string): Observable<StakerDTO> {

    return this.http.get<StakerDTO>(`${this.thorchainNetworkService.midgardBasePath}/v1/stakers/${address}`);

  }

  findStakerPoolData(stakerAddress: string, pools: string[]): Observable<StakerPoolData[]> {

    const params = new HttpParams().set('asset', pools.join(','));

    return this.http.get<StakerPoolData[]>(`${this.thorchainNetworkService.midgardBasePath}/v1/stakers/${stakerAddress}/pools`, {params});

  }

}
