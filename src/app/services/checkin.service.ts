import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }

  getCheckInsByMerchant(date = null): any {
    return this.http.post(`${this.globals.serverlink}get_checkin_by_merchantIcs.php`, { date });
  }

  checkInUser(data): any {
    return this.http.post(`${this.globals.serverlink}checkinCustomerForm.php`, { data });
  }

  getByCheckinId(id):any{
    return this.http.post(`${this.globals.serverlink}get_checkin_by_id.php`, {id});
  }

  updateCheckinCustomer(data):any{
    return this.http.post(`${this.globals.serverlink}update_checkin_customer.php`, {data});
  }

}
