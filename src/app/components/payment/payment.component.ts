import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PackageService } from '../../services/package.service';
import { Packages } from '../../models/packages';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {
  currentInvoices: any;
  // packages = [
  //   new Packages(1, "Small Package", "1 month", 50.00, false, 'packages'),
  //   new Packages(2, "Medium Packge", "6 months", 250.00, false, 'packages'),
  //   new Packages(3, "Large Package", "1 year", 450.00, false, 'packages')
  // ]

  totalDueInvoice: number = 0;
  totalDuePackage: any = 0;
  totalDue: any = 0;
  checkout: any = [];
  packages: any;
  user: any;
  currentItem: any;
  paidNotification : any = null;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private packageService: PackageService,
    private paymentService: PaymentService,
    public globals: Globals
  ) { }

  ngOnInit() {
    this.getPaymentExpiration();
    this.getAccountInfo();
    this.getOpenBalance();
    this.getPackages();
    this.route.params.subscribe(routeParams => {      
      if(routeParams.return){
        this.paidNotification = routeParams.return;
      }
    });
  }

  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
    .subscribe(data => {
      this.globals.expired = data.expired;
    });
  }

  setPackage(item): void {
    var balance = 0;
    this.currentItem = item;

    this.checkout.forEach(function (value, index, object) {
      if (value.type == "packages") {
        object.splice(index, 1);
      }
    });

    if (item.selected) {
      item.selected = false;
    } else {
      this.clearRadioButtons(this.packages);
      this.checkout.push(item);
      item.selected = true;
      balance = parseFloat(item.amount);

    }

    this.totalDue = (balance + this.totalDueInvoice).toFixed(2);

  } 

  goTo() { 
    window.location.href = "https://www.ics-caribbean.com/complianceServer/mollieTest.php?m=" + this.user.merchantId + "&p=" + this.currentItem.packageId;
    //window.location.href = "https://www.basilachill.com";
  }

  calculateInvoiceBalance(data): void {
    var balance: number = this.totalDueInvoice;
    if (data) {
      data.forEach(function (value) {
        balance = value.balance;
      });


    }
    this.totalDueInvoice = balance;
    this.totalDue = balance;
  }

  // calculateTotalDue(): void {
  //   this.totalDue = this.totalDueInvoice + this.totalDuePackage;
  // }


  itemExists(arrayToSearch, itemPushed) {
    var i;
    for (i = 0; i < arrayToSearch.length; i++) {

      if (arrayToSearch[i].value == itemPushed.value) {

        if (arrayToSearch.length == 1) {
          // this.payments = [];
        } else {
          // this.payments.splice(i, 1);
        }
        return true;
      }
    }

    return false;
  }

  getAccountInfo() {
    this.userService.getAccountInfo()
      .subscribe(data => {
        this.user = data.data;
      });
  }

  clearRadioButtons(data) {
    if (data) {
      data.forEach(function (value) {
        value.selected = false;
      });
    }
  }

  getPackages(): void {
    this.packageService.getPackages()
      .subscribe(data => {
        this.packages = data.data
      });
  }

  getOpenBalance(): void {
    this.userService.getMerchantOpenBalance()
      .subscribe(data => {
        if (data.data) {
          this.currentInvoices = data.data;
          this.checkout.push(data.data[0]);
          this.calculateInvoiceBalance(data.data);
        }
      });
  }

}
