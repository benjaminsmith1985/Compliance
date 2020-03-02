import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  customerPage: any;
  merchantPage: any;
  registerCustomerForm: FormGroup;
  registerMerchantForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.customerPage = 1;
    this.merchantPage = 1;

    this.registerCustomerForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [],
      retypepassword: [''],
      telephoneNo: [''],
      initials: [''],
      country: [''],
      place: [''],
      address: [''],
      nationality: [''],
      gender: ['']
    });

    this.registerMerchantForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [],
      retypepassword: [''],
      telephoneNo: [''],
      initials: [''],
      country: [''],
      place: [''],
      address: [''],
      nationality: [''],
      gender: ['']
    });
  }

  onSubmit(form_data: NgForm) {
    if (form_data.valid) {
      this.login(form_data.value);
    }
  }

  login(form_data) {
    console.log('binnen');
  }

  page(page, pageType): void {
    switch (pageType) {
      case 'customer':
        this.customerPage = page;
        break;
      case 'merchant':
        this.merchantPage = page;
        break;
    }
  }

  submitCustomerForm(): void {
    if (this.registerCustomerForm.invalid) {
      return;
    }

    this.registerCustomer();
  }

  registerCustomerDialog(): void {
    this.customerPage = 1;
    window['$']('#registerCustomerModal')['modal']('show');
  }

  registerMerchantDialog(): void {
    this.merchantPage = 1;
    window['$']('#registerBusinessModal')['modal']('show');
  }

  registerCustomer(): void {
    this.userService.registerUser(this.registerCustomerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          window['$']('#registerCustomerModal')['modal']('hide');
          this.registerCustomerForm.reset();
          this.customerPage = 1;
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }


}
