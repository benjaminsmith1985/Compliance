import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PackageService } from '../../services/package.service';
import { Packages } from '../../models/packages';

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

  totalDueInvoice: any = 0;
  totalDuePackage: any = 0;
  totalDue: any = 0;
  payments: any = [];
  packages: any;



  constructor(
    private userService: UserService,
    private packageService: PackageService
    ) { }

  ngOnInit() {
    this.getOpenBalance();
    this.getPackages();
  }

  setPackage(item): void {
    var balance = 0;

    this.payments.forEach(function (value, index, object) {
      if (value.type == "packages") {
        object.splice(index, 1);
      }
    });

    if (item.selected) { 
      item.selected = false;
    } else {
      this.clearRadioButtons(this.packages);
      this.payments.push(item);
      item.selected = true;
      balance = item.amount;
    }

    this.totalDue = (balance + this.totalDueInvoice).toFixed(2);

  }



  calculateInvoiceBalance(data): void {
    var balance = this.totalDueInvoice;
    if (data) {
      data.forEach(function (value) {
        balance = value.balance;
      });


    }
    this.totalDueInvoice = parseFloat(balance);
    this.totalDue = parseFloat(balance);
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
        this.currentInvoices = data.data;
        this.payments.push(data.data[0]);
        this.calculateInvoiceBalance(data.data);
      });
  }

}
