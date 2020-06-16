import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Globals } from './globals';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { CustomerComponent } from './components/customer/customer.component';
import { BusinessComponent } from './components/business/business.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerbusinessComponent } from './components/customerbusiness/customerbusiness.component';
import { DatasharingComponent } from './components/datasharing/datasharing.component';
import { DatasharingoptionsComponent } from './components/datasharingoptions/datasharingoptions.component';
import { DatasharingrequestComponent } from './components/datasharingrequest/datasharingrequest.component';
import { SearchcustomerComponent } from './components/searchcustomer/searchcustomer.component';
import { BusinesscustomerComponent } from './components/businesscustomer/businesscustomer.component';
import { BusinessaccountsComponent } from './components/businessaccounts/businessaccounts.component';
import { ReportComponent } from './components/report/report.component';
import { SearchComponent } from './components/search/search.component';
import { BusinessreportComponent } from './components/businessreport/businessreport.component';
import { AddbusinessComponent } from './components/addbusiness/addbusiness.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { BillingComponent } from './components/billing/billing.component';
import { BusinessuserComponent } from './components/businessuser/businessuser.component';
import { BusinesstransactionComponent } from './components/businesstransaction/businesstransaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BusinessemployeesComponent } from './components/businessemployees/businessemployees.component';
import { UsertransactionsComponent } from './components/usertransactions/usertransactions.component';
import { UsertransactionComponent } from './components/usertransaction/usertransaction.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UserreportsComponent } from './components/userreports/userreports.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { NewreportComponent } from './components/newreport/newreport.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { NewtransactionComponent } from './components/newtransaction/newtransaction.component';
import { UserreportComponent } from './components/userreport/userreport.component';
import { UseridComponent } from './components/userid/userid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { MatDatepickerModule } from '@angular/material';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Datepicker1Component } from './components/datepicker1/datepicker1.component';
import { MerchantaccountComponent } from './components/merchantaccount/merchantaccount.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CurrentinvoiceComponent } from './components/currentinvoice/currentinvoice.component';
import { FiureportsComponent } from './components/fiureports/fiureports.component';
import { UseridsComponent } from './components/userids/userids.component';
import { UserdocumentsComponent } from './components/userdocuments/userdocuments.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AdddocumentsComponent } from './components/adddocuments/adddocuments.component';
import { PaymentnotificationComponent } from './components/paymentnotification/paymentnotification.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    CustomerComponent,
    BusinessComponent,
    SidenavComponent,
    NavbarComponent,
    CustomerbusinessComponent,
    DatasharingComponent,
    DatasharingoptionsComponent,
    DatasharingrequestComponent,
    SearchcustomerComponent,
    BusinesscustomerComponent,
    BusinessaccountsComponent,
    ReportComponent,
    SearchComponent,
    BusinessreportComponent,
    AddbusinessComponent,
    PrivacyComponent,
    TermsComponent,
    BillingComponent,
    BusinessuserComponent,
    BusinesstransactionComponent,
    Datepicker1Component,
    TransactionsComponent, BusinessemployeesComponent, UsertransactionsComponent, UsertransactionComponent, ReportsComponent, UserreportsComponent, AddcustomerComponent, NewreportComponent, SearchInputComponent, NewtransactionComponent, UserreportComponent, UseridComponent, Datepicker1Component, MerchantaccountComponent, PaymentComponent, CurrentinvoiceComponent, FiureportsComponent, UseridsComponent, UserdocumentsComponent, SearchresultComponent, AdddocumentsComponent, PaymentnotificationComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule,
    ImageCropperModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    FormBuilder,
    MatDatepickerModule,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
