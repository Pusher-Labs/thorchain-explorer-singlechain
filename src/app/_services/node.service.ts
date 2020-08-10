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
    this.baseUrl = `${environment.thorNodeUrl}/thorchain`;
  }

  findAll(): Observable<ThorNode[]> {
    return this.http.get<ThorNode[]>(`${this.baseUrl}/nodeaccounts`);
  }

  findOne(address: string): Observable<ThorNode> {
    return this.http.get<ThorNode>(`${this.baseUrl}/nodeaccount/${address}`);
  }

  corsTest() {
    return this.http.get('https://a2wva4alb6.execute-api.us-east-1.amazonaws.com/dev/thornode/nodeaccounts');
  }

  corsTest2() {
    return this.http.get('https://a2wva4alb6.execute-api.us-east-1.amazonaws.com/dev/midgard/v1/network');
  }


}
