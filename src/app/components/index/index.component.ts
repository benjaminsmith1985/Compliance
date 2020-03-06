import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  loginForm: FormGroup;
  customerPage: any;
  merchantPage: any;
  submitted = false;
  registerCustomerForm: FormGroup;
  registerMerchantForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }
   

  ngOnInit() {
    this.customerPage = 1;
    this.merchantPage = 1;

    this.loginForm = this.formBuilder.group({
      icsNo: ['', Validators.required],
      password: ['', Validators.required],
      email: ['']
    });

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

  onSubmit(role) {

    this.submitted = true;
   
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

   
    this.loading = true;    

    this.loginForm.value.role = role;    

    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          switch (role) {
            case 'business':
              this.router.navigate(['/search']);
              break;
            case 'customer':
              this.router.navigate(['/customer']);
              window['$']('#loginModal')['modal']('hide');
              break;
          }

          this.loginForm.reset();
         

        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  // onSubmit(form_data: NgForm) {
  //   if (form_data.valid) {
  //     this.login(form_data.value);
  //   }
  // }

  login(form_data) {
 
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

  register():void{
    alert('awoo');
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
