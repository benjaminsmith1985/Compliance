import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private link: String = "http://localhost/complianceServer";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.link}/users`);
  }

  getById(id: number) {
    return this.http.get(`${this.link}/users/${id}`);
  }

  getCustomer(): any {
    return this.http.get(`${this.link}/get_customer.php`);
  }

  openPdf(data): any {
    console.log('test');
    window.open(`${this.link}/manual_reporting.php`);

  }

  getMerchantOpenBalance(): any {
    return this.http.post(`${this.link}/get_open_invoice`, {});
  }

  test(): any {
    console.log('aloden');
    return this.http.post(`http://108.179.196.226/~ics/mobileCustomerByIcs.php/`, {});
  }

  merchantUploadUserDocument(data): any {
    return this.http.post(`${this.link}/merchant_upload_user_document`, { data });
  }

  getCustomerById(data): any {
    return this.http.post(`${this.link}/get_customer_by_id.php`, { data });
  }

  getSeats(): any {
    return this.http.post(`${this.link}/get_merchant_seats`, {});
  }

  requestpermission(documentId, userIcsNo): any {
    return this.http.post(`${this.link}/insert_merchant_user_documents`, { documentId, userIcsNo });
  }

  fydoc(item, fy): any {
    return this.http.post(`${this.link}/fy_user_documents.php`, { item, fy });
  }

  getCustomerDocuments(data): any {
    return this.http.post(`${this.link}/get_user_documents.php`, { data });
  }

  insertSeats(user): any {
    return this.http.post(`${this.link}/add_seats`, { user });
  }

  getCustomerAuthorizedDocuments(data): any {
    return this.http.post(`${this.link}/get_customer_authorized_documents.php`, { data });
  }

  getMerchantCustomerDocumentsSlim(data, type): any {
    return this.http.post(`${this.link}/get_merchant_user_documents_slim`, { data, type });
  }

  getMerchantCustomerDocuments(data): any {
    return this.http.post(`${this.link}/get_merchant_user_documents.php`, { data });
  }

  getMerchantTransactions(data): any {
    return this.http.post(`${this.link}/get_merchant_transactions`, { data });
  }

  getMerchantReports(data): any {
    return this.http.post(`${this.link}/get_merchant_reports`, { data });
  }

  getMerchantFiuReports(data): any {
    return this.http.post(`${this.link}/get_merchant_fiu_reports`, {data});
  }

  getUserTransactions(data: any): any {
    return this.http.post(`${this.link}/get_user_transactions`, { data });
  }

  getUserReports(data: any): any {
    return this.http.post(`${this.link}/get_user_reports`, { data });
  }

  getBankAccounts(): any {
    return this.http.post(`${this.link}/get_merchant_bankaccounts`, {});
  }

  getInvoice(invoiceNo: any): any {
    return this.http.post(`${this.link}/get_invoice`, { invoiceNo });
  }

  getUserTransaction(data: any): any {
    return this.http.post(`${this.link}/get_user_transaction`, { data });
  }

  getUserRisk(data: any): any {
    return this.http.post(`${this.link}/get_merchant_user_risk`, { data });
  }

  getMerchantAttachedDocs(data: any): any {
    return this.http.post(`${this.link}/get_merchant_attached_docs`, { data });
  }

  getReportsByOperationUuid(data: any): any {
    return this.http.post(`${this.link}/merchant_report_get_by_operationuuid`, { data });
  }

  getUserTransactionReports(data: any): any {
    return this.http.post(`${this.link}/merchant_report_get_by_reportuuid.php`, { data });
  }

  getUserReportedIndicators(data: any): any {
    return this.http.post(`${this.link}/get_user_reported_indicators`, { data });
  }

  getIndicators(): any {
    return this.http.post(`${this.link}/get_indicator_by_occupational_group_id`, {});
  }

  getOccupationalGroups(): any {
    return this.http.post(`${this.link}/get_occupationalgroups`, {});
  }

  getThreshold(): any {
    return this.http.post(`${this.link}/get_merchant_threshold.php`, {});
  }

  getInvoiceHistory(): any {
    return this.http.post(`${this.link}/get_invoice_history`, {});
  } 

  searchUser(data: any): any {
    return this.http.post(`${this.link}/search_user.php`, { data });
  }

  search(data: any): any {
    return this.http.post(`${this.link}/search_customer.php`, { data });
  }

  searchHeroes(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    console.log('awo');
  }

  getUserByIcsNo(data: any): any {
    return this.http.post(`${this.link}/get_user_by_icsno`, { data });
  }

  getUserDocById(userIcsNo, docId): any {
    return this.http.post(`${this.link}/get_document_by_id`, { userIcsNo, docId });
  }

  startTransaction(data): any {
    return this.http.post(`${this.link}/set_transaction`, { data });
  }

  startReport(data): any {
    return this.http.post(`${this.link}/set_report`, { data });
  }

  updateTransaction(data): any {
    return this.http.post(`${this.link}/update_transaction`, { data });
  }

  insertReport(data): any {
    return this.http.post(`${this.link}/insert_report`, { data });
  }

  registerUser(data): any {
    return this.http.post(`${this.link}/register_user`, { data });
  }

  startCustomTransaction(data): any {
    return this.http.post(`${this.link}/set_custom_transaction`, { data });
  }

  getOperationByUuid(data): any {
    return this.http.post(`${this.link}/get_operation_by_uuid.php`, { data });
  }

  getAccountInfo(): any {
    return this.http.post(`${this.link}/get_merchant_account`, {});
  }

  updateDetails(data: any) {
    return this.http.post(`${this.link}/update_details`, { data });
  }

  inserBankAccount(data: any) {
    return this.http.post(`${this.link}/insert_bank_details`, { data });
  }

  register(user: User) {
    return this.http.post(`${this.link}/users/register`, user);
  }

  addCustomer(data: any) {
    return this.http.post(`${this.link}/add_merchant_user.php`, { data });
  }

  addUser(data: any): any {
    return this.http.post(`${this.link}/add_user.php`, { data });
  }

  update(user: User) {
    return this.http.put(`${this.link}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.link}/users/${id}`);
  }
}