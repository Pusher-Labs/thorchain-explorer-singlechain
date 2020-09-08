import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalStatsDTO } from '../_classes/global-stats';
import { ThorchainNetworkService } from './thorchain-network.service';


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  getStats(): Observable<GlobalStatsDTO> {
    return this.http.get<GlobalStatsDTO>(`${this.thorchainNetworkService.midgardBasePath}/v1/stats`);
  }

}
