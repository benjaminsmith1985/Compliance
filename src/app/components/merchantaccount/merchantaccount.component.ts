import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MerchantService } from '../../services/merchant.service';
import { CustomerService } from '../../services/customer.service';
import { DocumentService } from '../../services/document.service';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-merchantaccount',
  templateUrl: './merchantaccount.component.html',
  styleUrls: ['./merchantaccount.component.less']
})
export class MerchantaccountComponent implements OnInit {
  user: any;
  bankAccountForm: FormGroup;
  addSeatsForm: FormGroup;
  bankAccounts: any;
  seats: any;
  thresholds : any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    public globals: Globals
  ) { }

  ngOnInit() {
    this.getPaymentExpiration();
    this.getAccountInfo();
    this.getBankAccounts();
    this.getMerchantThreshold();
    this.getSeats();
    this.bankAccountForm = this.formBuilder.group({
      bankaccountnr: [''],
      bank: ['']
    });

    this.addSeatsForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email:['']
    });
  }

  getAccountInfo() {
    this.userService.getAccountInfo()
      .subscribe(data => {
        this.user = data.data;
      });
  }

  addBankAccount(): void {
    window['$']('#upAccModal')['modal']('show');
  }

  addSeats(): void {
    window['$']('#addSeatModal')['modal']('show');
  }

  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
    .subscribe(data => {
      this.globals.expired = data.expired;
    });
  }


  getBankAccounts() {
    this.userService.getBankAccounts()
      .subscribe(data => {
        this.bankAccounts = data.data;
      });
  }

  getSeats() {
    this.userService.getSeats()
      .subscribe(data => {
        this.seats = data.data;
      });
  }
 

  submitBankAccount(): void {
    if (this.bankAccountForm.invalid) {
      return;
    }

    this.insertBankAccount();
  }

  submitSeats(): void {
    if (this.addSeatsForm.invalid) {
      return;
    }

    this.insertSeats();
  }

  getMerchantThreshold(): void {
    this.userService.getThreshold()
      .subscribe(data => {
        this.thresholds = data.data;
      });
  }


  insertSeats(): void {
    this.userService.insertSeats(this.addSeatsForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.getSeats();
          window['$']('#addSeatModal')['modal']('hide');
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }


  insertBankAccount(): void {
    this.userService.inserBankAccount(this.bankAccountForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.getBankAccounts();
          window['$']('#upAccModal')['modal']('hide');
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }



}
