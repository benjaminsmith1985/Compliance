import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-merchantbankaccounts',
  templateUrl: './merchantbankaccounts.component.html',
  styleUrls: ['./merchantbankaccounts.component.less']
})
export class MerchantbankaccountsComponent implements OnInit {
  user: any;
  bankAccounts: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getBankAccounts();
  }

  getBankAccounts() {
    this.userService.getBankAccounts()
      .subscribe(data => {
        this.bankAccounts = data.data;
      });
  }


  // getUserByIcsNo(icsNo) {
  //   this.userService.getUserByIcsNo(icsNo)
  //     .subscribe(data => {
  //       this.user = data.data;
  //     });
  // }

}
