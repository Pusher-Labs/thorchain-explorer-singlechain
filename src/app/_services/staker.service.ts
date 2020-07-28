import { Injectable } from '@angular/core';
import { StakerDTO } from '../_classes/staker';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StakerPoolData } from '../_classes/staker-pool-data';

@Injectable({
  providedIn: 'root'
})
export class StakerService {

  constructor(private http: HttpClient) { }

  findAll(baseUrl: string): Observable<string[]> {

    return this.http.get<string[]>(`${baseUrl}/v1/stakers`);

  }

  findOne(baseUrl: string, address: string): Observable<StakerDTO> {

    return this.http.get<StakerDTO>(`${baseUrl}/v1/stakers/${address}`);

  }

  findStakerPoolData(baseUrl: string, stakerAddress: string, pools: string[]): Observable<StakerPoolData[]> {

    const params = new HttpParams().set('asset', pools.join(','));

    return this.http.get<StakerPoolData[]>(`${baseUrl}/v1/stakers/${stakerAddress}/pools`, {params});

  }

}
