import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-userdocuments',
  templateUrl: './userdocuments.component.html',
  styleUrls: ['./userdocuments.component.less']
})
export class UserdocumentsComponent implements OnInit {
  user: any;
  userDocuments: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.userIcs) {
        this.getUserByIcsNo(routeParams.userIcs);
        this.getCustomerDocuments(routeParams.userIcs);
      }
    });
  }

  getCustomerDocuments(id): void {
    this.userService.getMerchantCustomerDocuments(id)
      .subscribe(data => {
        this.userDocuments = data.data;
      });
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }


}
