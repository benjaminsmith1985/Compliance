import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  currentUser: any;

  constructor(
    public authenticationService: AuthenticationService, 
    private paymentService: PaymentService,
    public globals: Globals
  ) { }
 
  ngOnInit() {
    // this.getPaymentExpiration();
    this.currentUser = this.authenticationService.currentUserValue;
  }

  // getPaymentExpiration(): void {
  //   this.paymentService.getPaymentExpiration()
  //   .subscribe(data => {
  //     this.globals.expired = data.expired;
  //   });
  // }

}
