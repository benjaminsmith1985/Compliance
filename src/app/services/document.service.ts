import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

import { Merchant } from '../models/merchant';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private link: String = "http://localhost/complianceServer";

  // private link: String = 'http://108.179.196.226/~ics';

  constructor(
    private http: HttpClient,
    private globals: Globals) { }
 
  getCustomerDocuments():any {
    return this.http.get(`${this.globals.serverlink}get_customer_documents.php`);  
  } 

  fydoc(item, fy):any {
    return this.http.post(`${this.globals.serverlink}fy_user_documents.php`, { item, fy });
  }

  requestDocument(data):any {
    return this.http.post(`${this.globals.serverlink}request_document.php`, data);
  }
  
}