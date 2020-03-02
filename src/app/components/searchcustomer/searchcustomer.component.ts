import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-searchcustomer',
  templateUrl: './searchcustomer.component.html',
  styleUrls: ['./searchcustomer.component.less']
})
export class SearchcustomerComponent implements OnInit {
  searchForm: FormGroup;
  searchResult: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchResult = "";
    this.searchForm = this.formBuilder.group({
      chamberNo: [''],
      icsNo: [''],
      userType: ['natural'],
      companyName: [''],
      firstName: [''],
      lastName: [''],
      idType: [''],
      docNo: ['']
    });
  }

  newSearch(): void {
    this.searchResult = "";
  }

  addCustomer(icsNo): void {
    // console.log(icsNo);
    this.userService.addCustomer(icsNo).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/business/customers']);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

  

  searchUser(): void {
    //this.submitted = true;

    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }

    this.userService.searchUser(this.searchForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.searchResult = data.data;

        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });

  }

}
