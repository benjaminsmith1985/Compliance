import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-paymentnotification',
  templateUrl: './paymentnotification.component.html',
  styleUrls: ['./paymentnotification.component.less']
})
export class PaymentnotificationComponent implements OnInit {
  currentUser : any = null;

  constructor(
    public globals: Globals,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;  
  }

}
