import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asset {
  asset: string;
  dateCreated: number;
  priceRune: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  index(baseUrl: string, assets: string[]): Observable<Asset[]> {

    const params = new HttpParams().set('asset', assets.join(','));

    return this.http.get<Asset[]>(`${baseUrl}/v1/assets`, {params});

  }

}
