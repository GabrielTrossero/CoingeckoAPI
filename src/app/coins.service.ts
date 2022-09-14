import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.baseURL =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  }

  getAll(): Promise<any[]> {
    return this.httpClient.get<any[]>(this.baseURL).toPromise();
  }
}
