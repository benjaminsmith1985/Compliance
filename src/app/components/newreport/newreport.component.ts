import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MerchantService } from '../../services/merchant.service';
import { CustomerService } from '../../services/customer.service';
import { Observable, Subject } from 'rxjs';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-newreport',
  templateUrl: './newreport.component.html',
  styleUrls: ['./newreport.component.less']
})
export class NewreportComponent implements OnInit {
  heroes$: Observable<any>;
  insertCustomerForm: FormGroup;
  indicators: any;
  searchedMedias$: Observable<any>;
  searchresult: any;
  currentCustomer: any;
  formIndicator: any;
  threshold: any;
  userDocuments: any;
  attachedDocuments: any;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  @ViewChild("searchBox") searchBox: ElementRef;

  search(term: string): any {
    this.userService.search(term)
      .pipe(first())
      .subscribe(
        data => {
          this.searchresult = data.data;
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

  ngOnInit() {
    this.attachedDocuments = [];
    this.formIndicator = [];
    this.insertCustomerForm = this.formBuilder.group({
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
      ispep: ['0'],
      companyname: [''],
      tradename: [''],
      chamberno: [''],
      occgroup: [''],
      share: [''],
      save: ['1'],
      hastransaction: ['0'],
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
      attachedDocuments: [],
      thresholdex: [false],
      additionalInfo: [''],
      attachedId: [''],
      fromaccount: [''],
      toaccount: [''],
      island: ['Curacao'],
      caseDescription: ['']
    });

    this.getIndicators();
    this.getMerchantThreshold();

  }

  getIndicators(): void {
    this.userService.getIndicators()
      .subscribe(data => {
        this.indicators = data.data;
      });
  }

 

  getMerchantThreshold(): void {
    this.userService.getThreshold()
      .subscribe(data => {
        this.threshold = data.data;
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

  resetCustomer(): void {
    this.insertCustomerForm.value.attachedId = '';
    this.currentCustomer = null;
    this.searchBox.nativeElement.value = "";
    this.userDocuments = null;
  }


  setCustomer(item): void {
    this.resetCustomer();
    this.currentCustomer = item;
    this.searchresult = false;
    this.insertCustomerForm.value.fullname = item.firstname;
    this.getCustomerDocuments(item.icsNo);
  }

  getCustomerDocuments(id): void {
    this.userService.getMerchantCustomerDocuments(id)
      .subscribe(data => {
        this.userDocuments = data.data;
      });
  }

  attachDocument(item): void {
    if (item.selected) {
      item.selected = false;
    } else {
      item.selected = true;
    }

    var response = this.documentExists(this.attachedDocuments, item);

    if (!response) {
      this.attachedDocuments.push(item);
    }

    console.log(this.attachedDocuments);

  }

  documentExists(arrayToSearch, itemPushed) {
    var i;
    for (i = 0; i < arrayToSearch.length; i++) {

      if (arrayToSearch[i].value == itemPushed.value) {

        if (arrayToSearch.length == 1) {
          this.attachedDocuments = [];
        } else {
          this.attachedDocuments.splice(i, 1);
        }
        return true;
      }
    }

    return false;
  }


  submitForm(): void {
    if (this.insertCustomerForm.invalid) {
      return;
    }

    this.insertCustomer();
  }


  insertCustomer(): void {
    this.userService.addUser(this.insertCustomerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/business/customers']);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

  thresholdexceeded() {
    var thisv = this;
    thisv.threshold.forEach(function (item, i) {
      if (item.transactionType == thisv.insertCustomerForm.value.transactionType && thisv.insertCustomerForm.value.amount >= item.amount) {
        thisv.insertCustomerForm.value.thresholdex = true;
      }
    });
  }


  startReport(): void {
    if (this.insertCustomerForm.invalid) {
      return;
    }

    this.insertCustomerForm.value.formIndicator = this.formIndicator;
    this.insertCustomerForm.value.currentUser = this.currentCustomer;
    this.insertCustomerForm.value.attachedDocuments = this.attachedDocuments;
    this.insertCustomerForm.value.attachedId = this.insertCustomerForm.value.attachedId.documentId;

    this.thresholdexceeded();
    this.createTransaction();

  }


  createTransaction(): void {
    // window['$']('#alertModal')['modal']('hide');

    this.userService.startReport(this.insertCustomerForm.value)
      .pipe(first())
      .subscribe(
        data => {

          this.router.navigate(['/business/reports']);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

}


