import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CurrencyConversionDTO {
  thorchain: {
    usd: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  constructor(private http: HttpClient) { }

  getCurrencyConversion(): Observable<CurrencyConversionDTO> {
    return this.http.get<CurrencyConversionDTO>('https://api.coingecko.com/api/v3/simple/price?ids=thorchain&vs_currencies=usd');
  }

}
