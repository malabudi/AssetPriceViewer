import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  getCryptos() {
    return this.http.get('http://localhost:3333/api/cryptos');
  }
}
