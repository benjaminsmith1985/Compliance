import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-userreports',
  templateUrl: './userreports.component.html',
  styleUrls: ['./userreports.component.less']
})
export class UserreportsComponent implements OnInit  {

  reports: any;
  user: any;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.userIcs) {
        this.getUserReports(routeParams.userIcs);
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

  getUserReports(userIcs): void {
    this.userService.getUserReports(userIcs)
      .subscribe(data => {
        this.reports = data.data;
        console.log(data.data);
      });
  }

}
