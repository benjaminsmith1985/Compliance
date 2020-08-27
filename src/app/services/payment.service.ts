import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

 
  private link: String = "http://localhost/complianceServer";

  // private link: String = 'http://108.179.196.226/~ics';

  constructor(
    private http: HttpClient, 
    private globals: Globals) { }
 
  getPaymentExpiration():any {
    return this.http.get(`${this.globals.serverlink}get_payment_expiration.php`);  
  } 

 
}
