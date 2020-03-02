import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-datasharingoptions',
  templateUrl: './datasharingoptions.component.html',
  styleUrls: ['./datasharingoptions.component.less']
})
export class DatasharingoptionsComponent implements OnInit {

  constructor(
    private customerService: CustomerService
  ) { }
 
  ngOnInit() {
    this.getCustomerDocuments();
  } 

  getCustomerDocuments(): void {
    this.customerService.getCustomerDataSharing()
      .subscribe(data => {
       
      });
  }

}
