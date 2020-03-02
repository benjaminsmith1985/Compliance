import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usertransactions',
  templateUrl: './usertransactions.component.html',
  styleUrls: ['./usertransactions.component.less']
})
export class UsertransactionsComponent implements OnInit  {

  transactions: any;
  user: any;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {

      if (routeParams.userIcs) {
        this.getUserTransactions(routeParams.userIcs);
        this.getUserByIcsNo(routeParams.userIcs);
      }
    });    
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  getUserTransactions(userIcs): void {
    this.userService.getUserTransactions(userIcs)
      .subscribe(data => {
        this.transactions = data.data;
        console.log(data.data);
      });
  }

}
