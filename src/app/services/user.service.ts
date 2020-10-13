import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Globals } from '../globals';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }

  getAll() {
    return this.http.get<User[]>(`${this.globals.serverlink}users`);
  }

  getById(id: number) {
    return this.http.get(`${this.globals.serverlink}users/${id}`);
  }

  getCustomer(): any {
    return this.http.get(`${this.globals.serverlink}get_customer.php`);
  }

  openPdf(data): any {
    window.open(`${this.globals.serverlink}manual_reporting.php`);

  }

  getMerchantOpenBalance(): any {
    return this.http.post(`${this.globals.serverlink}get_open_invoice`, {});
  }

  test(): any {
    return this.http.post(`http://108.179.196.226/~ics/mobileCustomerByIcs.php/`, {});
  }

  merchantUploadUserDocument(data, file): any {
    return this.http.post(`${this.globals.serverlink}merchant_upload_user_document`, { data, file });
  }

  getCustomerById(data): any {
    return this.http.post(`${this.globals.serverlink}get_customer_by_id.php`, { data });
  }

  getSeats(amount = null): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_seats`, { amount });
  }

  getBranches(amount = null): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_branches`, { amount });
  }

  requestpermission(documentId, userIcsNo): any {
    return this.http.post(`${this.globals.serverlink}insert_merchant_user_documents`, { documentId, userIcsNo });
  }

  fydoc(item, fy): any {
    return this.http.post(`${this.globals.serverlink}fy_user_documents.php`, { item, fy });
  }

  getCustomerDocuments(data): any {
    return this.http.post(`${this.globals.serverlink}get_user_documents.php`, { data });
  }

  insertSeats(user): any {
    return this.http.post(`${this.globals.serverlink}add_seats`, { user });
  }

  getCustomerAuthorizedDocuments(data): any {
    return this.http.post(`${this.globals.serverlink}get_customer_authorized_documents.php`, { data });
  }

  getMerchantCustomerDocumentsSlim(data, type): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_user_documents_slim`, { data, type });
  }

  getMerchantCustomerDocuments(data): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_user_documents.php`, { data });
  }

  getMerchantTransactions(data): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_transactions`, { data });
  }

  getMerchantReports(data): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_reports`, { data });
  }

  getMerchantFiuReports(data): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_fiu_reports`, { data });
  }

  getUserTransactions(data: any): any {
    return this.http.post(`${this.globals.serverlink}get_user_transactions`, { data });
  }

  getUserWeeklyTransactions(data: any): any {
    return this.http.post(`${this.globals.serverlink}get_user_weekly_transactions`, { data });
  }

  getUserReports(data: any): any {
    return this.http.post(`${this.globals.serverlink}get_user_reports`, { data });
  }

  getBankAccounts(amount = null): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_bankaccounts`, { amount });
  }

  getInvoice(invoiceNo: any): any {
    return this.http.post(`${this.globals.serverlink}get_invoice`, { invoiceNo });
  }

  getUserTransaction(data: any): any {
    return this.http.post(`${this.globals.serverlink}get_user_transaction`, { data });
  }

  getUserRisk(data: any): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_user_risk`, { data });
  }

  getMerchantAttachedDocs(data: any): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_attached_docs`, { data });
  }

  getReportsByOperationUuid(data: any): any {
    return this.http.post(`${this.globals.serverlink}merchant_report_get_by_operationuuid`, { data });
  }

  getUserTransactionReports(data: any): any {
    return this.http.post(`${this.globals.serverlink}merchant_report_get_by_reportuuid.php`, { data });
  }

  getUserReportedIndicators(data: any): any {
    return this.http.post(`${this.globals.serverlink}get_user_reported_indicators`, { data });
  }

  getIndicators(): any {
    return this.http.post(`${this.globals.serverlink}get_indicator_by_occupational_group_id`, {});
  }

  getOccupationalGroups(): any {
    return this.http.post(`${this.globals.serverlink}get_occupationalgroups`, {});
  }

  getThreshold(): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_threshold.php`, {});
  }

  getInvoiceHistory(): any {
    return this.http.post(`${this.globals.serverlink}get_invoice_history`, {});
  }

  searchUser(data: any): any {
    return this.http.post(`${this.globals.serverlink}search_user.php`, { data });
  }

  search(data: any): any {
    return this.http.post(`${this.globals.serverlink}search_customer.php`, { data });
  }

  searchHeroes(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    console.log('awo');
  }

  getUserByIcsNo(data: any): any {
    return this.http.post(`${this.globals.serverlink}get_user_by_icsno`, { data });
  }

  getUserDocById(userIcsNo, docId): any {
    return this.http.post(`${this.globals.serverlink}get_document_by_id`, { userIcsNo, docId });
  }

  startTransaction(data): any {
    return this.http.post(`${this.globals.serverlink}set_transaction`, { data });
  }

  startReport(data): any {
    return this.http.post(`${this.globals.serverlink}set_report`, { data });
  }

  updateTransaction(data): any {
    return this.http.post(`${this.globals.serverlink}update_transaction`, { data });
  }

  insertReport(data): any {
    return this.http.post(`${this.globals.serverlink}insert_report`, { data });
  }

  registerUser(data): any {
    return this.http.post(`${this.globals.serverlink}register_user`, { data });
  }

  registerMerchant(data): any {
    return this.http.post(`${this.globals.serverlink}register_merchant.php`, { data });
  }

  startCustomTransaction(data): any {
    return this.http.post(`${this.globals.serverlink}set_custom_transaction`, { data });
  }

  getOperationByUuid(data): any {
    return this.http.post(`${this.globals.serverlink}get_operation_by_uuid.php`, { data });
  }

  confirmActivationCode(data): any {
    return this.http.post(`${this.globals.serverlink}confirm_activation_code.php`, { data });
  }

  getAccountInfo(): any {
    return this.http.post(`${this.globals.serverlink}get_merchant_account`, {});
  }

  updateDetails(data: any) {
    return this.http.post(`${this.globals.serverlink}update_details`, { data });
  }

  inserBankAccount(data: any) {
    return this.http.post(`${this.globals.serverlink}insert_bank_details`, { data });
  }

  register(user: User) {
    return this.http.post(`${this.globals.serverlink}users/register`, user);
  }

  addCustomer(data: any) {
    return this.http.post(`${this.globals.serverlink}add_merchant_user.php`, { data });
  }

  addUser(data: any): any {
    return this.http.post(`${this.globals.serverlink}add_user.php`, { data });
  }

  update(user: User) {
    return this.http.put(`${this.globals.serverlink}users/${user.id}`, user);
  }

  resetPassword(data: any):any {
    return this.http.post(`${this.globals.serverlink}user_reset_password`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.globals.serverlink}users/${id}`);
  }
}