import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.less']
})
export class BillingComponent implements OnInit {
  invoices: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getInvoiceHistory();
  }

  getInvoiceHistory() {
    this.userService.getInvoiceHistory()
      .subscribe(data => {
        this.invoices = data.data;
      });
  }

}
