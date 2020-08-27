import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThorchainNetworkService } from './thorchain-network.service';

export interface VersionSummary {
  current: string;
  next: string;
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) {}

  fetch(): Observable<VersionSummary> {
    return this.http.get<VersionSummary>(`${this.thorchainNetworkService.nodeBasePath}/thorchain/version`);
  }

}
