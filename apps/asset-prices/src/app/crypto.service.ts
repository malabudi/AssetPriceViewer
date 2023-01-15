import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  getCryptos() {
    const prodURL = 'https://asset-prices-api-production.up.railway.app/';
    return this.http.get(prodURL + 'api/cryptos');
  }
}
