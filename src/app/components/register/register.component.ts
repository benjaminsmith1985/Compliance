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
 
    this.registerForm = this.formBuilder.group({
      companyname: [''],
      tradename: [''],
      legalForm: [''],
      chamberno: [],
      email: [''],
      phone: [''],
      occgroup: [''],
      password: [''],
      streetName: [''],
      streetNumber: [''],
      place: [''],
      country: ['']
    });

    this.getOccupationalGroups();

    
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
    this.userService.registerUser(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          window['$']('#registerCustomerModal')['modal']('hide');
          this.registerForm.reset();
          this.customerPage = 1;
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
