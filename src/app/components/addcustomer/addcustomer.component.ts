import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MerchantService } from '../../services/merchant.service';
import { CustomerService } from '../../services/customer.service';
import { first } from 'rxjs/operators';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.less']
})
export class AddcustomerComponent implements OnInit {
  insertCustomerForm: FormGroup;
  occupationalGroups: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private paymentService: PaymentService,
    public globals: Globals
  ) { }

  ngOnInit() {
    this.getPaymentExpiration();
    this.getOccupationalGroups();
    this.insertCustomerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      userType: ['natural'],
      email: [''],
      birthDate: [''],
      initials: [''],
      marriedName: [''],
      nationality: [''],
      gender: [''],
      streetName: [''],
      streetNumber: [''],
      reportersCode: [''],
      place: [''],
      country: [''],
      birthCountry: [''],
      phone: [''],
      ispep: [''],
      legalForm: [''],
      companyname: [''],
      tradename: [''],
      chamberno: [''],
      occgroup: ['']
    });

    

  }

  submitForm(): void {
    // if (this.insertCustomerForm.invalid) {
    //   return;
    // }

    this.insertCustomer();
  }

  getOccupationalGroups(): void {
    this.userService.getOccupationalGroups()
      .subscribe(data => {    
          this.occupationalGroups = data.data;  
      });
  }

  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
    .subscribe(data => {
      this.globals.expired = data.expired;
    });
  }

  insertCustomer(): void {
    this.userService.addUser(this.insertCustomerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/business/user/' + data.data]);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

}


