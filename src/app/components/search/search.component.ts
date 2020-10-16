import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../globals';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchResult: any;

  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public globals: Globals
  ) { }

  ngOnInit() {
    this.searchResult = "";
    this.searchForm = this.formBuilder.group({
      keyword: [''],
      chamberNo: [''],
      icsNo: [''],
      gender: [''],
      userType: ['all'],
      email: [''],
      nationality: [''],
      address: [''],
      companyName: [''],
      firstName: [''],
      lastName: [''],
      idType: [''],
      docNo: [''],
      search: ['user'],
      transactionType: [''],
      phone: [''],
      island: [''],
      temperature: [''],
      hasReport: [''],
      fiuReported: [''],
      transactionId: [''],
      transactionAmount: [''],
      transactionDate: [''],
      checkinDate: [''],
      month: [],
      day: [],
      year: []
    });
    this.getPaymentExpiration();
  }

  newSearch(): void {
    this.searchResult = "";
  }

  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
    .subscribe(data => {
      this.globals.expired = data.expired;
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  resetForm(){
    // this.searchForm.reset();
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





  search(term: string): any {

    if (this.searchForm.invalid) {

      return;
    }



    this.userService.search(this.searchForm.value)
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

  searchUser(): void {
    //this.submitted = true;

    // stop here if form is invalid
    // if (this.searchForm.invalid) {
    //   console.log('invalid');
    //   return;
    // }
 

    var url_generating = "search/1/10/";

    var test = encodeURIComponent(JSON.stringify(this.searchForm.value));
    var url = [url_generating, test].join('');

    this.router.navigate([url]);


    // this.userService.searchUser(this.searchForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.searchResult = data.data;

    //     },
    //     error => {
    //       // this.alertService.error(error);
    //       // this.loading = false;
    //     });

  }

}
