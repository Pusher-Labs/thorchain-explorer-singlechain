import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Volume } from '../_classes/volume';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  constructor(private readonly http: HttpClient) { }

  getVolumeByDefault() {
    return this.http.get<Volume[]>(`http://175.41.165.95:8080/v1/history/total_volume?interval=hour&from=1597624918&to=1597711346`);
  }

  queryVolume(interval: string, from: number, to: number) {

    const params = new HttpParams().set('interval', interval).set('from', String(from)).set('to', String(to));

    return this.http.get<Volume[]>(`http://175.41.165.95:8080/v1/history/total_volume`,
    { params });
  }
}
