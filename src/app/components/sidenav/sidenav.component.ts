import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent implements OnInit {
  private role: string;
  customerType: string = 'select';
  searchCustomerForm: FormGroup;
  searchForm: FormGroup;
  currentUser: any = null;


  constructor(
    private userService: UserService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.searchCustomerForm = this.formBuilder.group({
      address: ['', Validators.required],
      place: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.searchForm = this.formBuilder.group({
      chamberNo: [''],
      icsNo: [''],
      userType: ['']
    });

    this.currentUser = this.authenticationService.currentUserValue;

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  searchUser(): void {
    //this.submitted = true;

    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }

    // this.loading = true;



    // this.userService.updateDetails(this.detailsForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {

    //       this.getUser();

    //       this.detailsForm.reset();
    //       window['$']('#changeDetailsModal')['modal']('hide');

    //     },
    //     error => {
    //       // this.alertService.error(error);
    //       this.loading = false;
    //     });

    this.userService.searchUser(this.searchForm.value)
      .subscribe(data => {

      });
  }

}
