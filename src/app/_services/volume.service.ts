import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Volume } from '../_classes/volume';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThorchainNetworkService } from './thorchain-network.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  constructor(private readonly http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  queryVolume(interval: string, from: number, to: number): Observable<Volume[]> {

    const params = new HttpParams().set('interval', interval).set('from', String(from)).set('to', String(to));

    return this.http.get<Volume[]>(`${this.thorchainNetworkService.midgardBasePath}/v1/history/total_volume`, { params });
  }
}
