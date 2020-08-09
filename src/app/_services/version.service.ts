import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface VersionSummary {
  current: string;
  next: string;
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.thorNodeUrl}/thorchain`;
  }

  fetch(): Observable<VersionSummary> {
    return this.http.get<VersionSummary>(`${this.baseUrl}/version`);
  }

}
