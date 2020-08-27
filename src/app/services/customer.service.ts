import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }
 
  getCurrentCustomer():any { 
    return this.http.get(`${this.globals.serverlink}get_current_customer.php`);
  } 

  getCustomerDocuments():any { 
    return this.http.get(`${this.globals.serverlink}get_customer_documents.php`);
  } 

  getCustomerDataSharing():any { 
    return this.http.get(`${this.globals.serverlink}get_data_sharing.php`);
  } 

  getCustomerDataRequest():any{
    return this.http.get(`${this.globals.serverlink}get_data_request.php`);
  }

  updateDatasharing(data: any):any {
    return this.http.post(`${this.globals.serverlink}update_merchantuser`, {data});
  }


}
