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
  selector: 'app-addbankaccount',
  templateUrl: './addbankaccount.component.html',
  styleUrls: ['./addbankaccount.component.less']
})

export class AddbankaccountComponent implements OnInit {
  bankAccountForm: FormGroup;
  user: any;
  closeResult: string; 

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {  
    this.bankAccountForm = this.formBuilder.group({
      bankaccountnr: [''],
      bank: ['']
    });
  }  

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  submitBankAccount(): void {
    if (this.bankAccountForm.invalid) {
      return;
    }

    this.insertBankAccount();
  }

  insertBankAccount(): void {
    this.userService.inserBankAccount(this.bankAccountForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/merchantaccount/bankaccounts']); 
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

}
