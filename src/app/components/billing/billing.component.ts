import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.less']
})
export class BillingComponent implements OnInit {
  invoices: any;

  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    public globals: Globals
    ) { }

  ngOnInit() {
    this.getPaymentExpiration();
    this.getInvoiceHistory();
  }

  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
    .subscribe(data => {
      this.globals.expired = data.expired;
    });
  }

  getInvoiceHistory() {
    this.userService.getInvoiceHistory()
      .subscribe(data => {
        this.invoices = data.data;
      });
  }

}
