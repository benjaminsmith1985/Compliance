import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MerchantService } from '../../services/merchant.service';
import { CurrencyService } from '../../services/currency.service';
import { CustomerService } from '../../services/customer.service';
import { Observable, Subject } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-newtransaction',
    templateUrl: './newtransaction.component.html',
    styleUrls: ['./newtransaction.component.less']
})
export class NewtransactionComponent implements OnInit {
    heroes$: Observable<any>;
    insertCustomerForm: FormGroup;
    insertIdForm: FormGroup;
    indicators: any;
    searchedMedias$: Observable<any>;
    searchresult: any;
    currentCustomer: any;
    formIndicator: any;
    threshold: any;
    userDocuments: any;
    attachedDocuments: any;
    identificationDocuments: any;
    bankAccounts: any;
    closeResult: string;
    selectedRisk: any;
    selectedId: any = false;
    hasParameter: any = false;
    currencies: any;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private currencyService: CurrencyService,
        private formBuilder: FormBuilder,
        private router: Router,
        private modalService: NgbModal
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
        window.scroll(0, 0);
        this.route.params.subscribe(routeParams => {
            if (routeParams.icsNo) {
                this.hasParameter = true;
                this.getUserByIcsNo(routeParams.icsNo);
            }
        });

        this.getCurrency();

        this.attachedDocuments = [];
        this.formIndicator = [];
        this.getBankAccounts();
        this.insertIdForm = this.formBuilder.group({
            idPlaceOfIssue: [''],
            idCountryOfIssue: [''],
            idExpirationDate: [''],
            dateOfIssue: [''],
            docName: [''],
            docNo: [],
            docType: []
        });
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
            transaction: ['buyin'],
            icsNo: [''],
            ispep: ['1'],
            companyname: [''],
            tradename: [''],
            chamberno: [''],
            occgroup: [''],
            share: [''],
            save: ['1'],
            hasreport: ['1'],
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
            ccy: [''],
            thresholdex: [false],
            additionalInfo: [''],
            attachedId: [''],
            fromaccount: [''],
            toaccount: [''],
            island: ['Curacao'],
            caseDescription: [''],
            hastransaction: [0],
            transactionDate: [''],
            fiureport: ["0"],
            dateOfIssue: ['']
        });

        this.getIndicators();
        this.getMerchantThreshold();

    }

    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }


    getIndicators(): void {
        this.userService.getIndicators()
            .subscribe(data => {
                this.indicators = data.data;
            });
    }


    getCustomerDocuments(id): void {
        this.userService.getMerchantCustomerDocuments(id)
            .subscribe(data => {
                this.userDocuments = data.data;
            });
    }

    getCustomerAuthorizedDocuments(id): void {
        this.userService.getCustomerAuthorizedDocuments(id)
            .subscribe(data => {
                this.userDocuments = data.data;
            });
    }

   
    selectBankAccount(): void {
        window['$']('#accModal')['modal']('show');
    }

    selectAccount(item): void {
        this.insertCustomerForm.controls['toaccount'].setValue(item.accountNr);
        this.modalService.dismissAll();
    }



    getBankAccounts() {
        this.userService.getBankAccounts()
            .subscribe(data => {
                this.bankAccounts = data.data;
            });
    }

    getUserByIcsNo(icsNo) {
        this.userService.getUserByIcsNo(icsNo)
            .subscribe(data => {
                this.setCustomer(data.data);
            });
    }



    resetCustomer(): void {
        this.insertCustomerForm.value.attachedId = '';
        this.currentCustomer = null;
        if (this.searchBox) {
            this.searchBox.nativeElement.value = "";
        }

        this.userDocuments = null;
        this.selectedRisk = null;
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

    getUserRisk(userIcsNo): void {
        this.userService.getUserRisk(userIcsNo)
            .subscribe(data => {
                this.selectedRisk = data.data;
            });
    }


    setCustomer(item): void {
        this.resetCustomer();
        this.currentCustomer = item;
        this.searchresult = false;
        this.insertCustomerForm.value.fullname = item.firstname;
        this.getCustomerAuthorizedDocuments(item.icsNo);
        this.getUserRisk(item.icsNo);
    }

    selectDocument(item, array): void {

        array.forEach(function (data) {
            data.selected = false;
        });

        if (item == this.identificationDocuments) {
            this.identificationDocuments = false;
        } else {
            item.selected = true;
            this.identificationDocuments = item;
        }

    }


    getMerchantThreshold(): void {
        this.userService.getThreshold()
            .subscribe(data => {
                this.threshold = data.data;
            });
    }

    getCurrency(): void {
        this.currencyService.getCurrencies()
            .subscribe(data => {
                //console.log(data);
           
                this.currencies = data; 
            
            });
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


    startReport(): void {
        if (this.insertCustomerForm.invalid) {
            console.log('invalid');
            return;
        }


        this.insertCustomerForm.value.formIndicator = this.formIndicator;
        this.insertCustomerForm.value.currentUser = this.currentCustomer;
        this.insertCustomerForm.value.attachedDocuments = this.attachedDocuments;
        //  this.insertCustomerForm.value.attachedId = this.insertCustomerForm.value.attachedId.documentId;

        this.thresholdexceeded();
        this.createTransaction();

    }


    createTransaction(): void {
        // window['$']('#alertModal')['modal']('hide');

        this.userService.startCustomTransaction(this.insertCustomerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/business/transactions/1/10']);
                },
                error => {
                    // this.alertService.error(error);
                    // this.loading = false;
                });
    }

    attachDocument(item): void {
        if (item.selected) {
            item.selected = false;
        } else {
            item.selected = true;
        }

        var response = this.documentExists(this.attachedDocuments, item);
        console.log(response);

        if (!response) {
            this.attachedDocuments.push(item);
        }

    }

    uploadDocument(data): void {
        this.userService.merchantUploadUserDocument(data)
            .subscribe(response => {

                this.modalService.dismissAll();
            });
    }

    attachDoc(icsNo, docType) {
        var data: any = false;
        switch (docType) {
            case 'id':
                var data = this.insertIdForm.value;
                data.docType = 'id';
                break;
            case 'transaction':
                var data = this.insertIdForm.value;
                data.docType = 'transaction';
                break;
        }
        if (data) {
            data.userIcsNo = icsNo;
            this.uploadDocument(data);
        }
    }

    attach() {
        var thisv = this;
        var document: any = {
            certified: "0",
            countryIssue: thisv.insertIdForm.value.idCountryOfIssue,
            dateIssue: thisv.insertCustomerForm.value.dateOfIssue,
            dateVerified: "",
            documentId: "00",
            documentName: thisv.insertIdForm.value.idDocType,
            documentNr: thisv.insertIdForm.value.idDocNo,
            documentType: "id",
            expirationDate: thisv.insertIdForm.value.idExpirationDate,
            expired: "",
            formattedExpirationDate: "",
            icsNo: "",
            merchantIcsNo: "",
            merchantuserdocumentId: "",
            new: "",
            path: "",
            permission: "1",
            placeIssue: thisv.insertIdForm.value.idPlaceOfIssue,
            requestDate: "",
            uploadDate: "",
            userIcsNo: "",
            userId: "",
            verified: "",
            verifiedBy: ""
        }

        if (this.userDocuments && this.userDocuments.id) {
            this.userDocuments.id.push(document);
        } else {
            this.userDocuments = { id: [document] };
        }

        this.modalService.dismissAll();
        this.insertIdForm.reset();


    }

    thresholdexceeded() {
        var thisv = this;
        thisv.threshold.forEach(function (item, i) {
            if (item.transactionType == thisv.insertCustomerForm.value.transactionType && thisv.insertCustomerForm.value.amount >= item.amount) {
                thisv.insertCustomerForm.value.thresholdex = true;
            }
        });
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


}


