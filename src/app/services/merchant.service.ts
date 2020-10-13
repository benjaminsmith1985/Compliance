import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

import { Merchant } from '../models/merchant';

@Injectable({ providedIn: 'root' })
export class MerchantService {

  private link: String = "http://localhost/complianceServer";

  // private link: String = 'http://108.179.196.226/~ics';

  constructor(
    private http: HttpClient, 
    private globals: Globals) { }


  getMerchantAccounts(): any {
    return this.http.get(`${this.globals.serverlink}get_merchant_accounts`);
  }

  getMerchantUsers(data): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_users`, {data});
  }

  getMerchantEmployees(): any {
    return this.http.get(`${this.globals.serverlink}get_merchant_employees`);
  }

  getMerchantById(data): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_by_id_short`, { data });
  }

  updateMerchantUser(data: any) {
    return this.http.post(`${this.globals.serverlink}update_merchantuser_bymerchant`, { data });
  }

  updateMerchantAccount(data: any) {
    return this.http.post(`${this.globals.serverlink}update_merchantaccount`, { data });
  }


}