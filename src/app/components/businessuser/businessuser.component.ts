import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgbModal, NgbDateStruct, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MerchantService } from '../../services/merchant.service';
import { CustomerService } from '../../services/customer.service';
import { DocumentService } from '../../services/document.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { switchMapTo, first } from 'rxjs/operators';
import { Globals } from '../../globals';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-businessuser',
  templateUrl: './businessuser.component.html',
  styleUrls: ['./businessuser.component.less']
})
export class BusinessuserComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  currentDocument: any;
  userType: any;
  user: any;
  insertIdForm: FormGroup;
  insertDocForm: FormGroup;
  userDocuments: any;
  identificationDocuments: any;
  otherDocuments: any;
  modal: any;
  closeResult: string;
  currentItem: any;
  transactions: any;
  reports: any;
  riskRating = [
    { riskrate: 'Low', selected: false, color: 'lime-green' },
    { riskrate: 'Medium', selected: false, color: 'orange' },
    { riskrate: 'High', selected: false, color: 'red' },
    { riskrate: 'Unknown', selected: false, color: 'grey' }
  ]
  selectedRisk: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private customerService: CustomerService,
    private documentService: DocumentService,
    private router: Router,
    private modalService: NgbModal,
    public globals: Globals,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.insertIdForm = this.formBuilder.group({
      idPlaceOfIssue: [''],
      idCountryOfIssue: [''],
      idExpirationDate: [''],
      dateOfIssue: [''],
      docName: [''],
      base64: [''],
      docNo: [],
      docType: []
    });

    this.insertDocForm = this.formBuilder.group({
      docName: [''],
      docNo: [''],
      base64: ['']
    });

    this.getPaymentExpiration();

    this.route.params.subscribe(routeParams => {
      if (routeParams.id) {
        this.getUserByIcsNo(routeParams.id);
        this.getCustomerDocumentsByType(routeParams.id, 'id');
        this.getCustomerDocumentsByType(routeParams.id, 'other');
        this.getUserTransactions(routeParams.id);
        this.getUserReports(routeParams.id);
        this.getUserRisk(routeParams.id);
      }
    });
  }

  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
      .subscribe(data => {
        this.globals.expired = data.expired;
      });
  }

  addCustomer(icsNo): void {
    var r = confirm("Are you sure you want to add this user as a customer?");

    if (r == false) {
      return;
    } 

    this.userService.addCustomer(icsNo).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/business/pendingcustomers/1/10']);
          this.modalService.dismissAll();
        },
        error => {

        });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.insertIdForm.value.base64 = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  getMerchantById(id) {
    this.merchantService.getMerchantById(id)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  setRisk(item): void {
    this.riskRating.forEach(function (data) {
      data.selected = false;
    });

    this.selectedRisk = item.riskrate;
    item.selected = true;

    this.updateMerchantUser(item.riskrate);
  }

  getUserRisk(userIcsNo): void {
    this.userService.getUserRisk(userIcsNo)
      .subscribe(data => {
        this.selectedRisk = data.data;
      });
  }

  // requestpermission(documentId, userIcsNo) {
  //   this.userService.requestpermission(documentId, userIcsNo)
  //     .subscribe(data => {
  //       this.getCustomerDocuments(userIcsNo);
  //     });
  // }

  getCustomerById(id) {
    this.userService.getCustomerById(id)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  goToReports(item, user) {
    if (typeof (item) != "undefined") {
      this.router.navigate(['/userreports/' + user.icsNo]);
    }
  }

  goToTransactions(item, user) {
    if (typeof (item) != "undefined") {
      this.router.navigate(['/usertransactions/' + user.icsNo]);
    }
  }

  fyDocs(item, fy): void {
    this.currentItem = item;
    this.modal = fy;
  }

  updateDocs(fy): void {
    this.userService.fydoc(this.currentItem, fy)
      .subscribe(data => {
        this.route.params.subscribe(routeParams => {
          if (routeParams.id) {
            this.getCustomerDocumentsByType(routeParams.id, 'id');
            this.getCustomerDocumentsByType(routeParams.id, 'other');
          }
        });
      });
  }

  updateMerchantUser(risk): void {
    var data: any = {};
    data.userIcsNo = this.user.icsNo;
    data.risk = risk;

    this.merchantService.updateMerchantUser(data)
      .subscribe(data => {
      });
  }

  openDoc(item, content) {
    this.currentDocument = item;
    this.router.navigate(['/business/userid/' + item.userIcsNo + '/' + item.documentId]);
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
      this.insertIdForm.reset();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      // this.insertIdForm.reset();
      return 'by clicking on a backdrop';
    } else {
      this.insertIdForm.reset();
      return `with: ${reason}`;
    }

  }


  getCustomerDocumentsByType(id, type): void {
    this.userService.getMerchantCustomerDocumentsSlim(id, type)
      .subscribe(data => {
        switch (type) {
          case 'id':
            this.identificationDocuments = data.data;
            break;
          case 'other':
            this.otherDocuments = data.data;
            break;
        }
      });
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  getUserTransactions(userIcs): void {
    this.userService.getUserTransactions(userIcs)
      .subscribe(data => {
        this.transactions = data.data;
      });
  }

  getUserReports(userIcs): void {
    this.userService.getUserReports(userIcs)
      .subscribe(data => {
        this.reports = data.data;
      });
  }

  uploadDocument(data, file): void {
    this.userService.merchantUploadUserDocument(data, file)
      .subscribe(response => {
        this.getCustomerDocumentsByType(data.userIcsNo, data.documentType);
        this.modalService.dismissAll();
      });
  }


  attach(icsNo, docType) {
    var data: any = false;
    switch (docType) {
      case 'id':
        var data = this.insertIdForm.value;
        data.docType = 'id';
        break;
      case 'other':
        var data = this.insertIdForm.value;
        data.docType = 'other';
        break;
    }
    if (data) {
      var file = 'file';
      data.userIcsNo = icsNo;
      this.uploadDocument(data, file);
    }
  }

}
