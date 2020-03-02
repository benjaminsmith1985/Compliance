import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-datasharing',
  templateUrl: './datasharing.component.html',
  styleUrls: ['./datasharing.component.less']
})
export class DatasharingComponent implements OnInit {

  dataShares: any;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomerDocuments();
  }

  getCustomerDocuments(): void {
    this.customerService.getCustomerDataSharing()
      .subscribe(data => {
        this.dataShares = data.data;
      });
  }

}
