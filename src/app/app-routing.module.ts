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
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: IndexComponent },
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
  { path: 'business/employees', component: BusinessemployeesComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'merchantaccount', component: MerchantaccountComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/accounts', component: BusinessaccountsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/user/:id', component:  BusinessuserComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'business/addcustomer', component:  AddcustomerComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'usertransactions/:userIcs', component:  UsertransactionsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
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
  { path: 'terms', component: TermsComponent, canActivate: [AuthGuard], data: { expectedRole: 'customer' } },
  { path: 'billing/history', component: BillingComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'billing/payment', component: PaymentComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'billing/invoice/:invoiceNo', component: CurrentinvoiceComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } },
  { path: 'userreports/:userIcs', component:  UserreportsComponent, canActivate: [AuthGuard], data: { expectedRole: 'business' } }
]; 
 
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
