import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';

@Component({
  selector: 'app-paymentnotification',
  templateUrl: './paymentnotification.component.html',
  styleUrls: ['./paymentnotification.component.less']
})
export class PaymentnotificationComponent implements OnInit {

  constructor(
    public globals: Globals
  ) { }

  ngOnInit() {
  }

}
