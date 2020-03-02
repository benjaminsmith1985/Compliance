import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Merchant } from '../models/merchant';

@Injectable({ providedIn: 'root' })
export class MerchantService {

  private link: String = "http://localhost/complianceServer";

  constructor(private http: HttpClient) { }


  getMerchantAccounts(): any {
    return this.http.get(`${this.link}/get_merchant_accounts`);
  }

  getMerchantUsers(data): any {
    return this.http.post(`${this.link}/get_merchant_users`, {data});
  }

  getMerchantEmployees(): any {
    return this.http.get(`${this.link}/get_merchant_employees`);
  }

  getMerchantById(data): any {
    return this.http.post(`${this.link}/get_merchant_by_id`, { data });
  }

  updateMerchantUser(data: any) {
    return this.http.post(`${this.link}/update_merchantuser_bymerchant`, { data });
  }


}