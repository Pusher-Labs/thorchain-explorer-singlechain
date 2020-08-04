import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface NetworkStatus {
  bondMetrics: {
    totalActiveBond: string,
    averageActiveBond: string,
    medianActiveBond: string,
    minimumActiveBond: string,
    maximumActiveBond: string,
    totalStandbyBond: string,
    averageStandbyBond: string,
    medianStandbyBond: string,
    minimumStandbyBond: string,
    maximumStandbyBond: string
  };
  activeBonds: string[];
  standbyBonds: string[];
  totalStaked: string;
  activeNodeCount: number;
  standbyNodeCount: number;
  totalReserve: string;
  poolShareFactor: string;
  blockRewards: {
    blockReward: string,
    bondReward: string,
    stakeReward: string
  };
  bondingROI: string;
  stakingROI: string;
  nextChurnHeight: string;
  poolActivationCountdown: number;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  network(): Observable<NetworkStatus> {
    return this.http.get<NetworkStatus>(`${environment.midgardUrl}/v1/network`);
  }

}
