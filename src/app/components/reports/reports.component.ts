import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit {

  reports: any = false;
  amountPages: any = false;
  currentPage: any = null;
  amountPerPage: any = false; 
  amountReports: any = false;
  amountPagingBtns: number = 3;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    public globals: Globals
  ) { }

  ngOnInit() {
    this.getPaymentExpiration();
    this.route.params.subscribe(routeParams => {
      if (routeParams.page && routeParams.amount) {
        var data: any = { amount: routeParams.amount, page: routeParams.page }
        this.getMerchantReports(data);
        this.currentPage = routeParams.page;
        this.amountPerPage = routeParams.amount;
      }
    });

  }

  counter(i: number) {
    let x: any = false;
    if (this.amountPages > this.amountPagingBtns) {
      x = new Array(this.amountPagingBtns);
    } else {
      x = new Array(i);
    }
    return x;
  }

   
  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
    .subscribe(data => {
      this.globals.expired = data.expired;
    });
  }

  getMerchantReports(data): void {
    this.userService.getMerchantReports(data)
      .subscribe(data => {
        if (!data.error) {
          this.reports = data.data;
          this.amountPages = data.pages;
          this.amountReports = data.amountReports;
        }

      });
  }

}
