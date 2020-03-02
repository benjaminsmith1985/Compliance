import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MerchantService } from '../../services/merchant.service';
import { CustomerService } from '../../services/customer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-businesstransaction',
  templateUrl: './businesstransaction.component.html',
  styleUrls: ['./businesstransaction.component.less']
})
export class BusinesstransactionComponent implements OnInit {

  userType: any;
  user: any;
  identificationDocuments: any;
  transactionForm: FormGroup;
  threshold: any;
  indicators: any;
  formIndicator: any;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private merchantService: MerchantService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formIndicator = [];
    this.transactionForm = this.formBuilder.group({
      amount: [''],
      srcFunds: [''],
      service: [''],
      transactionType: [''],
      suspicious: [''],
      description: [''],
      reportThreshold: [''],
      currency: [''],
      reportSuspicious: [''],
      isPep: [''],
      icsNo: [''],
      thresholdIndicator: [''],
      suspiciousIndicator: [],
      formIndicator: [], 
      report:[""]
    });

    // this.addCheckboxes();
    // this.getMerchantThreshold();
    this.getIndicators();

    this.route.params.subscribe(routeParams => {
      if (routeParams.id) {
        this.getUserByIcsNo(routeParams.id);
      }


      // if (routeParams.id && routeParams.type) {
      //   switch (routeParams.type) {
      //     case 'legal':
      //       this.userType = "legal";
      //       this.getMerchantById(routeParams.id);
      //       break;
      //     case 'natural':
      //       this.userType = "natural";
      //       this.getCustomerById(routeParams.id);
      //       this.getCustomerDocuments(routeParams.id);
      //       break;
      //   }
      // }
    });
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
    .subscribe(data => {
      this.user = data.data;
    });
  }

  getMerchantById(id) {
    this.merchantService.getMerchantById(id)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  getIndicators(): void {
    this.userService.getIndicators()
      .subscribe(data => {
        this.indicators = data.data;
      });
  }


  getCustomerById(id) {
    this.userService.getCustomerById(id)
      .subscribe(data => {
        this.user = data.data;

      });
  }

  itemExists(arrayToSearch, itemPushed) {
    // if (arrayToSearch) {
    //   arrayToSearch.forEach(function (item, i) {
    //     if (item.value == itemPushed.value) {

    //       if (item.length == 1) {
    //         this.formIndicator = [];
    //       } else {
    //         this.formIndicator.splice(i, 1);
    //       }
    //       return true;
    //     }
    //   });
    // }

    // return false;

    var i;
    for (i = 0; i < arrayToSearch.length; i++) {

      if (arrayToSearch[i].value == itemPushed.value) {

        if (arrayToSearch.length == 1) {
          this.formIndicator = [];
        } else {
          this.formIndicator.splice(i, 1);
        }
        return true;
      }
    }

    return false;
  }


  indicatorExists(arrayToSearch, indicator):any {

   var result = false;

    arrayToSearch.forEach(function (item) {
      if (item.value == indicator.indicator) {
        result = item;
      }
    });

    return result;
  }




  selectSubIndicator(item, all, parentIndicator) {

    parentIndicator.selected = true;

    this.clearRadioButtons(all);
    item.selected = true;

    var response = this.indicatorExists(this.formIndicator, parentIndicator);

    if (response) {
      response.subIndicator = item.indicatorNr;
    } else {
      this.formIndicator.push({ type: parentIndicator.indicatorType, value: parentIndicator.indicator, subIndicator: item.indicatorNr });      
    }

  }

  clearRadioButtons(data) {
    if (data) {
      data.forEach(function (value) {
        value.selected = false;
      });
    }
  }



  test(item) {
    var value = { type: item.indicatorType, value: item.indicator };

    if (this.itemExists(this.formIndicator, value) == false) {
      this.formIndicator.push({ type: item.indicatorType, value: item.indicator });
    }

    if (item.selected) {
      item.selected = false;
      this.clearRadioButtons(item.subIndicator);
    } else {
      item.selected = true;
    }

    console.log(this.formIndicator);
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
        this.threshold.amount = data.data.amount.toString();
      });
  }

  startTransaction(): void {
    if (this.transactionForm.invalid) {
      return;
    }

    this.transactionForm.value.icsNo = this.user.icsNo;
    // this.transactionForm.value.thresholdIndicator = this.threshold.indicator;
    // this.transactionForm.value.suspiciousIndicator = this.threshold.indicator;
    this.transactionForm.value.formIndicator = this.formIndicator;

    this.createTransaction();

    // if (this.transactionForm.value.amount >= this.threshold.amount) { 
    //   window['$']('#alertModal')['modal']('show');
    // } else {
    //   this.createTransaction();
    // }

  }


  createTransaction(): void {
    // window['$']('#alertModal')['modal']('hide');

    this.userService.startTransaction(this.transactionForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data.data);
          this.router.navigate(['/business/transactions']);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

}


