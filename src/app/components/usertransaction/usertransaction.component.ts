import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usertransaction',
  templateUrl: './usertransaction.component.html',
  styleUrls: ['./usertransaction.component.less']
})
export class UsertransactionComponent implements OnInit {

  transaction: any;
  transactionReports: any;
  attachedDocs: any;
  operation: any;
  indicators: any = false;
  uuid: any;

  reportCustomerForm: FormGroup;
  formIndicator: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.transactionId) {
        this.getUserTransaction(routeParams.transactionId);
        this.getUserTransactionReports(routeParams.transactionId);
        this.getMerchantAttachedDocs(routeParams.transactionId);
        this.getOperationByUuid(routeParams.transactionId);
        // this.getIndicators();
        this.getUserReportedIndicators(routeParams.transactionId);
        this.uuid = routeParams.transactionId;
      }
    });

    this.formIndicator = [];
    this.reportCustomerForm = this.formBuilder.group({
      fullname: [''],
      userType: ['natural'],
      lastname: [''],
      email: [''],
      birthdate: [''],
      nationality: [''],
      address: [''],
      place: [''],
      country: [''],
      phone: [''],
      icsNo: [''],
      ispep: ['1'],
      companyname: [''],
      tradename: [''],
      chamberno: [''],
      occgroup: [''],
      share: [''],
      save: ['1'],
      hasreport: ['0'],
      clientType: ['client'],
      search: [''],
      amount: [''],
      currentUser: [''],
      transactionType: ['Cash'],
      suspicious: ['0'],
      description: [''],
      reportThreshold: [''],
      currency: [''],
      reportSuspicious: [''],
      isPep: [''],
      thresholdIndicator: [''],
      suspiciousIndicator: [],
      formIndicator: [],
      report: [""],
      srcFunds: [''],
      service: [''],
      reason: [''],
      thresholdex: [false],
      fiureport: ["0"]
    });
  }

  getOperationByUuid(uuid): void {
    this.userService.getOperationByUuid(uuid)
      .subscribe(data => {
        this.operation = data.data;
      });
  }

  getUserReportedIndicators(data): void {
    this.userService.getUserReportedIndicators(data)
      .subscribe(data => {
        this.indicators = data.data;
      });
  }

  getIndicators(): void {
    this.userService.getIndicators()
      .subscribe(data => {
        this.indicators = data.data;
        console.log('test');
      });
  }

  getMerchantAttachedDocs(uuid): void {
    this.userService.getMerchantAttachedDocs(uuid)
      .subscribe(data => {
        this.attachedDocs = data.data;
      });
  } 

  getUserTransactionReports(transactionId): void {
    this.userService.getReportsByOperationUuid(transactionId)
      .subscribe(data => {
        this.transactionReports = data.data;
      });
  }

  getUserTransaction(transactionId): void {
    this.userService.getUserTransaction(transactionId)
      .subscribe(data => {
        this.transaction = data.data;
      });
  }

  itemExists(arrayToSearch, itemPushed) {
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

  }

  indicatorExists(arrayToSearch, indicator): any {

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

  submitForm(): void {
    if (this.reportCustomerForm.invalid) {
      return;
    }

    this.reportCustomerForm.value.formIndicator = this.formIndicator;
    this.reportCustomerForm.value.transactionId = this.transaction.transactionId;
    this.reportCustomerForm.value.operationId = this.operation.operationId;
    this.reportCustomerForm.value.uuid = this.uuid;
    this.updateTransaction();
  } 


  updateTransaction(): void {
    this.userService.updateTransaction(this.reportCustomerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/business/reports/1/10']);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }



}
