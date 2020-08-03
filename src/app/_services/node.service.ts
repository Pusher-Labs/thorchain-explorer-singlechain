import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThorNode } from '../_classes/thor-node';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.thorNodeUrl}/thorchain/nodeaccounts`;
  }

  findAll(): Observable<ThorNode[]> {
    return this.http.get<ThorNode[]>(this.baseUrl);
  }

  findOne(address: string): Observable<ThorNode[]> {
    return this.http.get<ThorNode[]>(`${this.baseUrl}/${address}`);
  }


}
