import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PoolDetail {
  asset: string;
  // status: "bootstrapped",
  price: string;
  assetStakedTotal: string;
  runeStakedTotal: string;
  poolStakedTotal: string;
  assetDepth: string;
  runeDepth: string;
  poolDepth: string;
  poolUnits: string;
  sellVolume: string;
  buyVolume: string;
  poolVolume: string;
  poolVolume24hr: string;
  sellTxAverage: string;
  buyTxAverage: string;
  poolTxAverage: string;
  sellSlipAverage: string;
  buySlipAverage: string;
  poolSlipAverage: string;
  sellFeeAverage: string;
  buyFeeAverage: string;
  poolFeeAverage: string;
  sellFeesTotal: string;
  buyFeesTotal: string;
  poolFeesTotal: string;
  sellAssetCount: string;
  buyAssetCount: string;
  swappingTxCount: string;
  swappersCount: string;
  stakeTxCount: string;
  withdrawTxCount: string;
  stakingTxCount: string;
  stakersCount: string;
  assetROI: string;
  runeROI: string;
  poolROI: string;
  poolROI12: string;
}

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  constructor(private http: HttpClient) { }

  index(baseUrl: string): Observable<string[]> {
    return this.http.get<string[]>(`${baseUrl}/v1/pools`);
  }

  details(baseUrl: string, assets: string[]): Observable<PoolDetail[]> {
    const params = new HttpParams().set('asset', assets.join(','));

    return this.http.get<PoolDetail[]>(`${baseUrl}/v1/pools/detail`, {params});
  }

}
