import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MerchantService } from '../../services/merchant.service';
import { CustomerService } from '../../services/customer.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-businessreport',
  templateUrl: './businessreport.component.html',
  styleUrls: ['./businessreport.component.less']
})
export class BusinessreportComponent implements OnInit{

  userType: any;
  user: any;
  identificationDocuments: any;
  transactionForm: FormGroup;
  threshold: any;
  indicators: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private merchantService: MerchantService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.transactionForm = this.formBuilder.group({
      amount: [''],
      srcFunds: [''],
      service: [''],
      transactionType: [''],
      suspicious: [''],
      description: ['']
    });

    // this.getMerchantThreshold();
    this.getIndicators();

    this.route.params.subscribe(routeParams => {

      if (routeParams.id && routeParams.type) {
        switch (routeParams.type) {
          case 'legal':
            this.userType = "legal";
            this.getMerchantById(routeParams.id);
            break;
          case 'natural':
            this.userType = "natural";
            this.getCustomerById(routeParams.id);
            this.getCustomerDocuments(routeParams.id);
            break;
        }
      }
    });
  }

  getMerchantById(id) {
    this.merchantService.getMerchantById(id)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  getCustomerById(id) {
    this.userService.getCustomerById(id)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  getCustomerDocuments(id): void {
    this.userService.getCustomerDocuments(id)
      .subscribe(data => {
        this.identificationDocuments = data.data;
      });
  }


  getMerchantThreshold(): void {
    this.userService.getThreshold()
      .subscribe(data => {
        this.threshold = data.data;
      });
  }

  getIndicators(): void {
    this.userService.getIndicators()
      .subscribe(data => {
        this.indicators = data.data;
      });
  }

  startTransaction(): void {
    if (this.transactionForm.invalid) {
      return;
    }

    if (this.transactionForm.value.amount >= this.threshold.amount) {
      window['$']('#alertModal')['modal']('show');
    } else {
      this.createTransaction();
    }

  }


  createTransaction(): void {
    window['$']('#alertModal')['modal']('hide');
    
    this.userService.startTransaction(this.transactionForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data.data);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

}


