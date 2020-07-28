import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GlobalStats {
  dailyActiveUsers: string;
  monthlyActiveUsers: string;
  totalUsers: string;
  dailyTx: string;
  monthlyTx: string;
  totalTx: string;
  totalVolume24hr: string;
  totalVolume: string;
  totalStaked: string;
  totalDepth: string;
  totalEarned: string;
  poolCount: string;
  totalAssetBuys: string;
  totalAssetSells: string;
  totalStakeTx: string;
  totalWithdrawTx: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getStats(): Observable<GlobalStats> {
    return this.http.get<GlobalStats>(`${environment.midgardUrl}/v1/stats`);
  }

}
