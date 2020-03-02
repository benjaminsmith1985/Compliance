import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../../services/merchant.service';

@Component({
  selector: 'app-businessemployees',
  templateUrl: './businessemployees.component.html',
  styleUrls: ['./businessemployees.component.less']
})
export class BusinessemployeesComponent implements OnInit {

  merchantEmployees: any;

  constructor(
    private merchantService: MerchantService
  ) { }

  ngOnInit() {
    this.getMerchantEmployees();
  }

  getMerchantEmployees() {
    this.merchantService.getMerchantEmployees()
      .subscribe(data => {

        this.merchantEmployees = data.data;
      });
  }

}
