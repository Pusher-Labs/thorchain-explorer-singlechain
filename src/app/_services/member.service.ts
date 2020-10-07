import { Injectable } from '@angular/core';
import { MemberDTO } from '../_classes/member';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MemberPoolData } from '../_classes/member-pool-data';
import { environment } from '../../environments/environment';
import { ThorchainNetworkService } from './thorchain-network.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  findAll(): Observable<string[]> {

    return this.http.get<string[]>(`${this.thorchainNetworkService.midgardBasePath}/v1/stakers`);

  }

  findOne(address: string): Observable<MemberDTO> {

    return this.http.get<MemberDTO>(`${this.thorchainNetworkService.midgardBasePath}/v1/stakers/${address}`);

  }

  findMemberPoolData(memberAddress: string, pools: string[]): Observable<MemberPoolData[]> {

    const params = new HttpParams().set('asset', pools.join(','));

    return this.http.get<MemberPoolData[]>(`${this.thorchainNetworkService.midgardBasePath}/v1/stakers/${memberAddress}/pools`, {params});

  }

}
