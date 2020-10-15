import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AddbusinessComponent } from './components/addbusiness/addbusiness.component';
import { CustomerbusinessComponent } from './components/customerbusiness/customerbusiness.component';
import { BusinessComponent } from './components/business/business.component';
import { DatasharingComponent } from './components/datasharing/datasharing.component';
import { DatasharingoptionsComponent } from './components/datasharingoptions/datasharingoptions.component';
import { DatasharingrequestComponent } from './components/datasharingrequest/datasharingrequest.component';
import { SearchcustomerComponent } from './components/searchcustomer/searchcustomer.component';
import { SearchComponent } from './components/search/search.component';
import { PendingcustomersComponent } from './components/pendingcustomers/pendingcustomers.component';
import { BusinesscustomerComponent } from './components/businesscustomer/businesscustomer.component';
import { BusinesstransactionComponent } from './components/businesstransaction/businesstransaction.component';
import { BusinessuserComponent } from './components/businessuser/businessuser.component';
import { BusinessaccountsComponent } from './components/businessaccounts/businessaccounts.component';
import { BillingComponent } from './components/billing/billing.component';
import { ReportComponent } from './components/report/report.component';
import { BusinessreportComponent } from './components/businessreport/businessreport.component';
import { BusinessemployeesComponent } from './components/businessemployees/businessemployees.component';
import { UsertransactionsComponent } from './components/usertransactions/usertransactions.component';
import { UsertransactionComponent } from './components/usertransaction/usertransaction.component';
import { UserreportComponent } from './components/userreport/userreport.component';
import { UserreportsComponent } from './components/userreports/userreports.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TermsComponent } from './components/terms/terms.component'; 
import { ReportsComponent } from './components/reports/reports.component';
import { FiureportsComponent } from './components/fiureports/fiureports.component';
import { NewreportComponent } from './components/newreport/newreport.component';
import { NewtransactionComponent } from './components/newtransaction/newtransaction.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { UseridComponent } from './components/userid/userid.component';
import { UseridsComponent } from './components/userids/userids.component';
import { UserdocumentsComponent } from './components/userdocuments/userdocuments.component';
import { MerchantaccountComponent } from './components/merchantaccount/merchantaccount.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CurrentinvoiceComponent } from './components/currentinvoice/currentinvoice.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { AdddocumentsComponent } from './components/adddocuments/adddocuments.component';
import { RegisterComponent } from './components/register/register.component';
import { MerchantbankaccountsComponent } from './components/merchantbankaccounts/merchantbankaccounts.component';
import { AddbankaccountComponent } from './components/addbankaccount/addbankaccount.component';
import { AddseatsComponent } from './components/addseats/addseats.component';
import { MerchantseatsComponent } from './components/merchantseats/merchantseats.component';
import { MerchanteditaccountComponent } from './components/merchanteditaccount/merchanteditaccount.component';
import { AccountactivationComponent } from './components/accountactivation/accountactivation.component';
import { PasswordsetComponent } from './components/passwordset/passwordset.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { AddbranchComponent } from './components/addbranch/addbranch.component';
import { MerchantbranchesComponent } from './components/merchantbranches/merchantbranches.component';
import { CheckinformComponent } from './components/checkinform/checkinform.component';
import { RequestdocumentComponent } from './components/requestdocument/requestdocument.component';
import { CustomercheckinComponent } from './components/customercheckin/customercheckin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: IndexComponent },
  { path: 'checkinform/:m', component: CheckinformComponent },
  { path: 'checkinform/:m/:b', component: CheckinformComponent },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard], data: { expectedRole: 'customer' } },
  { path: 'customerbusiness', component: CustomerbusinessComponent, canActivate: [AuthGuard], data: { expectedRole: 'customer' } },
  { path: 'customerbusiness/add', component: AddbusinessComponent, canActivate: [AuthGuard], data: { expectedRole: 'customer' } },
  { path: 'datashare', component: DatasharingComponent, canActivate: [AuthGuard], data: { expectedRole: 'customer' } },
  { path: 'datashare/options', component: DatasharingoptionsComponent, canActivate: [AuthGuard], data: { expectedRole: 'customer' } },
  { path: 'datashare/request', component: DatasharingrequestComponent, canActivate: [AuthGuard], data: { expectedRole: 'customer' } },
  { path: 'business', component: BusinessComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'searchcustomer', component: SearchcustomerComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'search/:page/:amount/:data', component: SearchresultComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/customers/:page/:amount', component: BusinesscustomerComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/pendingcustomers/:page/:amount', component: PendingcustomersComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/employees', component: BusinessemployeesComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount', component: MerchantaccountComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount/bankaccounts', component: MerchantbankaccountsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount/branches', component: MerchantbranchesComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount/bankaccounts/add', component: AddbankaccountComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount/seats', component: MerchantseatsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount/seats/add', component: AddseatsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount/branch/add', component: AddbranchComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount/edit', component: MerchanteditaccountComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/accounts', component: BusinessaccountsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/user/:id', component:  BusinessuserComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'accountactivation/:userType/:icsNo/:code', component:  AccountactivationComponent, data: { expectedRole: 'business' } },
  { path: 'business/addcustomer', component:  AddcustomerComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'usertransactions/:userIcs', component:  UsertransactionsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'requestdocument/:userIcs', component:  RequestdocumentComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'usertransaction/:transactionId', component:  UsertransactionComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'userreport/:transactionId', component:  UserreportComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/transaction/:id', component:  BusinesstransactionComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/transactions/:page/:amount', component:  TransactionsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/reports/:page/:amount', component:  ReportsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/fiureports/:page/:amount', component: FiureportsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/newreport', component:  NewreportComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/userid/:userIcs/:docId', component:  UseridComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/userids/:userIcs', component:  UseridsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/userdocuments/:userIcs', component:  UserdocumentsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/newtransaction', component:  NewtransactionComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/newtransaction/:icsNo', component:  NewtransactionComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'businessreport/:id/:type', component: BusinessreportComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard], data: { expectedRole: 'customer' } },
  { path: 'terms', component: TermsComponent },
  { path: 'billing/history', component: BillingComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'billing/payment', component: PaymentComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'billing/payment/:return', component: PaymentComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'billing/invoice/:invoiceNo', component: CurrentinvoiceComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'billing/invoice/:invoiceNo/:return', component: CurrentinvoiceComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'checkin', component: CheckinComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'checkin/:checkinId', component: CustomercheckinComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'userreports/:userIcs', component:  UserreportsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'passwordset/:userType/:icsNo/:code', component:  PasswordsetComponent, data: { expectedRole: 'business' } },
  { path: 'register', component:  RegisterComponent },
  { path: 'documents/add/:docType/:userIcs', component:  AdddocumentsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } }
]; 
 
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
