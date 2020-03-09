import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgbModal, NgbDateStruct, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MerchantService } from '../../services/merchant.service';
import { CustomerService } from '../../services/customer.service';
import { DocumentService } from '../../services/document.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-adddocuments',
  templateUrl: './adddocuments.component.html',
  styleUrls: ['./adddocuments.component.less']
})
export class AdddocumentsComponent implements OnInit {
  insertDocForm: FormGroup;
  selectedIdentification: any;
  selectedDocument: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  user: any;

  documentType = [
    { type: 'Identification Document', id: 'id', selected: false, color: 'lime-green' },
    { type: 'Other Document', id: 'other', selected: false, color: 'lime-green' }
  ];

  identificationType = [
    { type: 'Passport', selected: false, color: 'lime-green' },
    { type: 'Drivings License', selected: false, color: 'lime-green' },
    { type: 'Identification Card', selected: false, color: 'lime-green' }
  ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private customerService: CustomerService,
    private documentService: DocumentService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.userIcs && routeParams.docType) {
        this.setDocumentType(routeParams.docType);
        this.getUserByIcsNo(routeParams.userIcs);

      }
    });

    this.insertDocForm = this.formBuilder.group({
      idPlaceOfIssue: [''],
      idCountryOfIssue: [''],
      idExpirationDate: [''],
      dateOfIssue: [''],
      docName: [''],
      base64: [''],
      docNo: [],
      docType: []
    });
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  setIdentificationType(item): void {
    this.identificationType.forEach(function (data) {
      data.selected = false;
    });

    this.selectedIdentification = item.type;

    item.selected = true;
  }

  setDocumentType(item): void {
    this.selectedDocument = item;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    var data = this.insertDocForm.value;
    data.base64 = event.base64;
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

  uploadDocument(): void {
    var data = this.insertDocForm.value;
    data.docType = this.selectedDocument;

    var userIcsNo = this.user.icsNo;
    data.userIcsNo = userIcsNo;

    if (data.docType == 'id') {
      data.docName = this.selectedIdentification;
    }


    this.userService.merchantUploadUserDocument(data)
      .subscribe(response => {
        switch (data.docType) {
          case 'id':
            this.router.navigate(['/business/userids/' + userIcsNo]);
            break;
            case 'other':
            this.router.navigate(['/business/userdocuments/' + userIcsNo]);
            break;
        }

      });
  }


}
