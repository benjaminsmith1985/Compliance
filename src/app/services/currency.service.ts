import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private link: String = "https://openexchangerates.org/api/currencies.json";

  constructor(private http: HttpClient) { }

  getCurrencies() {
    return this.http.get(`${this.link}`);
  }
}
