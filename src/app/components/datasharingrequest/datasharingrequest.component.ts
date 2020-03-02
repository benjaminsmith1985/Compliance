import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Merchantuser } from '../../models/merchantuser';

@Component({
  selector: 'app-datasharingrequest',
  templateUrl: './datasharingrequest.component.html',
  styleUrls: ['./datasharingrequest.component.less']
})
export class DatasharingrequestComponent implements OnInit {

  dataRequest: any;
  merchantuser: Merchantuser;
  currentItem: any;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCustomerRequest();
  }

  getCustomerRequest(): void {
    this.customerService.getCustomerDataRequest()
      .subscribe(data => {
        this.dataRequest = data.data;
      });
  }

  grandPermission(): void {
    this.merchantuser = new Merchantuser;    
    this.merchantuser.merchantuserId = this.currentItem.merchantuserId;
    this.merchantuser.granted = 1;

    this.customerService.updateDatasharing(this.merchantuser)
      .subscribe(data => {
        this.dataRequest = data.data;
        this.router.navigate(['/datashare']);
        window['$']('#confirmModal')['modal']('hide');
      });
  }

  confirm(item): void {
    window['$']('#confirmModal')['modal']('show');
    this.currentItem = item;
  }

}
