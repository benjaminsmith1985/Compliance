import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Merchant } from '../models/merchant';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private link: String = "http://localhost/complianceServer";

  // private link: String = 'http://108.179.196.226/~ics';

  constructor(private http: HttpClient) { }
 
  getCustomerDocuments():any {
    return this.http.get(`${this.link}/get_customer_documents.php`);  
  } 

  fydoc(item, fy):any {
    return this.http.post(`${this.link}/fy_user_documents.php`, { item, fy });
  }
  
}