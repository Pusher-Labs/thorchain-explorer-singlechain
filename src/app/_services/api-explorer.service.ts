import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ThorchainNetworkService, THORChainNetwork } from './thorchain-network.service';

// @Todo proper types for each response, functions etc.

const IGNORED_ENDPOINTS = ['/v1/doc', '/v1/swagger.json'];

const DEFAULT_NETWORK = 'chaosnet';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  activeNetwork: THORChainNetwork;
  endpoints = [];

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) {
    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
      (network) => {
        this.activeNetwork = network;
      }
    );

  }

  async getEndpoint(path: string, acR: ActivatedRoute): Promise<string> {
    let url = decodeURI(path);
    url = url.split('?')[0]; // Remove query params

    // Reload endpoints if empty
    if (this.endpoints.length === 0) {
      await this.getEndpoints();
    }

    for (const i of this.endpoints) {
      let searchPath = i.path;
      if (searchPath === url) {
        return i;
      } else {
        // If unmatched try replacing the params
        const addr = acR.snapshot.paramMap.get('address');
        if (addr) {
          searchPath = searchPath.replace(`{address}`, addr);
        }
        if (searchPath === url) {
          return {
            ...i,
            customParams: {
              address: addr,
            },
          };
        }
      }
    }
    // @Todo show endpoint not found component
  }

  getRoot(): string {
    return this.thorchainNetworkService.midgardBasePath;
  }

  formatEndpoints(endpoints = []): any[] {
    const result = [];
    Object.entries(endpoints).forEach(([path, data]) => {
      if (IGNORED_ENDPOINTS.includes(path)) {
        return;
      }

      // @Todo only GET supported for now
      if (data.get) {
        result.push({
          path: `/api-explorer${path}`,
          label: path,
          method: 'GET',
          description: data.get.description,
          summary: data.get.summary,
          params: data.get.parameters,
        });
      }
    });
    return result;
  }

  async getEndpoints(): Promise<any> {
    const path = '/v1/swagger.json';
    const response: any = await this.http
      .get(`${this.getRoot()}${path}`)
      .toPromise();
    this.endpoints = this.formatEndpoints(response.paths);
    return this.endpoints;
  }

  callEndpoint(opts): Promise<any> {
    let { path } = opts;
    const { method = 'GET' } = opts;
    if (!path) {
      return null;
    }

    path = path.replace('/api-explorer', '');

    return this.http.get(`${this.getRoot()}${path}`).toPromise();
  }
}
