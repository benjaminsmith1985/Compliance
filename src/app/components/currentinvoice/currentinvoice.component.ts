import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currentinvoice',
  templateUrl: './currentinvoice.component.html',
  styleUrls: ['./currentinvoice.component.less']
})
export class CurrentinvoiceComponent implements OnInit {
  invoice: any;
  merchant: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.invoiceNo) {
        this.getAccountInfo();
        this.getInvoice(routeParams.invoiceNo);
      }
    });
  }

  getAccountInfo() {
    this.userService.getAccountInfo()
      .subscribe(data => {
        this.merchant = data.data;
      });
  }


  getInvoice(invoiceNo) {
    this.userService.getInvoice(invoiceNo)
      .subscribe(data => {
        this.invoice = data.data;
      });
  }

}
