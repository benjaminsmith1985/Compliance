import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private link: String = "http://localhost/complianceServer";

  constructor(private http: HttpClient) { }
 
  getCurrentCustomer():any { 
    return this.http.get(`${this.link}/get_current_customer.php`);
  } 

  getCustomerDocuments():any { 
    return this.http.get(`${this.link}/get_customer_documents.php`);
  } 

  getCustomerDataSharing():any { 
    return this.http.get(`${this.link}/get_data_sharing.php`);
  } 

  getCustomerDataRequest():any{
    return this.http.get(`${this.link}/get_data_request.php`);
  }

  updateDatasharing(data: any):any {
    return this.http.post(`${this.link}/update_merchantuser`, {data});
  }


}
