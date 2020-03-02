import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../../services/merchant.service';

@Component({
  selector: 'app-customerbusiness',
  templateUrl: './customerbusiness.component.html',
  styleUrls: ['./customerbusiness.component.less']
})
export class CustomerbusinessComponent implements OnInit {
  merchantAccounts: any;

  constructor(
    private merchantService: MerchantService
  ) { } 

  ngOnInit() {
    this.getMerchantAccounts();
  }

  getMerchantAccounts(){
    this.merchantService.getMerchantAccounts()
    .subscribe(data => {
   
      this.merchantAccounts = data.data;
    });
  }

}
