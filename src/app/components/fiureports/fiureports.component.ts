import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-fiureports',
  templateUrl: './fiureports.component.html',
  styleUrls: ['./fiureports.component.less']
})
export class FiureportsComponent implements OnInit {
  reports: any = false;
  amountPages: any = false;
  currentPage: any = null;
  amountPerPage: any = false;
  amountResults: any = false;
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
        this.getMerchantFiuReports(data);
        this.currentPage = routeParams.page;
        this.amountPerPage = routeParams.amount;
      }
    });
    
  }

  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
    .subscribe(data => {
      this.globals.expired = data.expired;
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


  getMerchantFiuReports(data): void {
    this.userService.getMerchantFiuReports(data)
      .subscribe(data => {
        this.reports = data.data;
        this.amountPages = data.pages;
        this.amountResults = data.amountResults;   
      });
  }


}
