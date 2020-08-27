import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Globals } from '../../globals';

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
    public globals: Globals,
    private router: Router) { }

  ngOnInit() {
    this.getOccupationalGroups();
    this.registerForm = this.formBuilder.group({
      companyname: [null,[Validators.required, Validators.minLength(2)]],
      tradename: [''],
      legalForm: [''],
      chamberno: [null,[Validators.required, Validators.minLength(2)]],
      reportersCode: [],
      email: [null,[Validators.required, Validators.email]],
      lastName: [null,[Validators.required, Validators.minLength(2)]],
      firstName: [null,[Validators.required, Validators.minLength(2)]],
      phone: [null,[Validators.required, Validators.minLength(5)]],
      occgroup: [null,[Validators.required, Validators.minLength(2)]],
      password: [null,[Validators.required, Validators.minLength(2)]],
      retypedPassword: [null,[Validators.required, Validators.minLength(2)]],
      streetName: [null,[Validators.required, Validators.minLength(2)]],
      streetNumber: [''],
      userEmail: [null,[Validators.required, Validators.email]],
      place: [null,[Validators.required, Validators.minLength(2)]],
      country: ['']
    });

   

    
  }

  onSubmit(form_data: NgForm) {
    if (form_data.valid) {
      console.log('valid');
      this.login(form_data.value);
    }else{
      console.log('Not Valid');
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
      alert('Please fill in all the required fields');
      return;
    }

    this.registerCustomer();
  }

  registerCustomer(): void {
    this.globals.isLoading = true;
    this.userService.registerMerchant(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {                 
           this.registerForm.reset();
           this.globals.isLoading = false;
           this.router.navigate(['/login']);
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
      });
  }

}
