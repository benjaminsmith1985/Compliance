import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { Globals } from '../../globals';

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
  currentUser : any = null;

  constructor(

    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public globals: Globals
    ) { }
   

  ngOnInit() {
    this.customerPage = 1;
    this.merchantPage = 1;


    this.loginForm = this.formBuilder.group({
      icsNo: [null,[Validators.required, Validators.minLength(2)]],
      password: [null,[Validators.required, Validators.minLength(2)]],
      email: [null,[Validators.required, Validators.minLength(2)]]
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

    this.currentUser = this.authenticationService.currentUserValue;
    if(this.currentUser){
      this.router.navigate(['/search']);
    }
  }

  onSubmit(role) {
    

    this.submitted = true;
   
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      alert('The information you provided is icorrect.');
      return;
    }

    this.globals.isLoading = true;

   

   
    this.loading = true;    

    this.loginForm.value.role = role;    

    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          switch (role) {
            case 'business':
              this.globals.expired = data.expired;
              this.router.navigate(['/search']);
              this.globals.isLoading = false;
              break;
            case 'customer':
              this.router.navigate(['/customer']);
              window['$']('#loginModal')['modal']('hide');
              break;
          }

          this.loginForm.reset();
         
          this.globals.isLoading = false;
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
