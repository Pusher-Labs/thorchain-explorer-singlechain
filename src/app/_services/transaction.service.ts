import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransactionType } from '../_const/transaction-type.enum';
import { Observable } from 'rxjs';
import { TransactionDTO } from '../_classes/transaction';
import { environment } from '../../environments/environment';
import { ThorchainNetworkService } from './thorchain-network.service';

export interface TransactionIndexParams {
  offset: number;
  type?: TransactionType[];
  asset?: string;
  txid?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public limit: number;

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) {
    this.limit = 10;
  }

  index(p: TransactionIndexParams): Observable<TransactionDTO> {

    let params = new HttpParams().set('offset', String(p.offset)).set('limit', String(this.limit));

    if (p.type) {
      params = params.append('type', p.type.join(','));
    }

    if (p.asset) {
      console.log('setting asset!', p.asset);
      params = params.append('asset', p.asset);
    }

    if (p.txid) {
      params = params.append('txid', p.txid);
    }

    if (p.address) {
      params = params.append('address', p.address);
    }

    return this.http.get<TransactionDTO>(`${this.thorchainNetworkService.midgardBasePath}/v1/txs`, {params});

  }

}
