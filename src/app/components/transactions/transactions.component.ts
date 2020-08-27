import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.less']
})
export class TransactionsComponent implements OnInit {

  transactions: any = false;
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
        this.getMerchantTransactions(data);
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



  getMerchantTransactions(data): void {
    this.userService.getMerchantTransactions(data)
      .subscribe(data => {    
          this.transactions = data.data;     
          this.amountPages = data.pages;
          this.amountResults = data.amountResults;   
      });
  }

}
