import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../../services/merchant.service';

@Component({
  selector: 'app-businessaccounts',
  templateUrl: './businessaccounts.component.html',
  styleUrls: ['./businessaccounts.component.less']
})
export class BusinessaccountsComponent implements OnInit {
  merchantAccounts: any;

  constructor(
    private merchantService: MerchantService
  ) { }

  ngOnInit() {
    this.getMerchantAccounts();
  }

  getMerchantAccounts() {
    this.merchantService.getMerchantAccounts()
      .subscribe(data => {

        this.merchantAccounts = data.data;
      });
  }

}
