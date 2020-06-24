import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  customerPage: any;
  merchantPage: any;
  registerForm: FormGroup;
  occupationalGroups: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getOccupationalGroups();
    this.registerForm = this.formBuilder.group({
      companyname: [''],
      tradename: [''],
      legalForm: [''],
      chamberno: [],
      reportersCode: [],
      email: [''],
      lastName: [''],
      firstName: [''],
      phone: [''],
      occgroup: [''],
      password: [''],
      retypedPassword: [''],
      streetName: [''],
      streetNumber: [''],
      userEmail: [''],
      place: [''],
      country: ['']
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
    if (this.registerForm.invalid) {
      return;
    }

    this.registerCustomer();
  }

  registerCustomer(): void {
    this.userService.registerMerchant(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {       
          // this.registerForm.reset();
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

  submitForm(): void {
    
  }

  getOccupationalGroups(): void {
    this.userService.getOccupationalGroups()
      .subscribe(data => {    
          this.occupationalGroups = data.data;  
          console.log(this.occupationalGroups); 
      });
  }

}
