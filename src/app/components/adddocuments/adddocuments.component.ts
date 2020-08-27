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
  closeResult: string;
  private file: File | null = null;

  documentType = [
    { type: 'Identification Document', id: 'id', selected: false, color: 'lime-green' },
    { type: 'Other Document', id: 'other', selected: false, color: 'lime-green' }
  ];

  documentNames = [
    { name: 'Excerpt of Chamber of Commerce' },
    { name: 'Address Verification' },
    { name: 'Shareholders Register' },
    { name: 'Application Establishment Permit' },
    { name: 'Articles of Incorporation' },
    { name: 'Residence Permit' },
    { name: 'Work Permit' }
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
      docExt: [''],
      docNo: [],
      docType: [],
      doc: []
    });
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

  selectAccount(item): void {
    this.insertDocForm.controls['docName'].setValue(item.name);
    this.modalService.dismissAll();
  }

  setDocumentType(item): void {
    this.selectedDocument = item;
  }

  fileChangeEvent(event: any): void {
    var vr = this;

    this.file = event.target.files[0];
     console.log(this.file);
    vr.insertDocForm.controls['docExt'].setValue(this.file.name.slice((this.file.name.lastIndexOf(".") - 1 >>> 0) + 2));

    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = function () {
      vr.insertDocForm.controls['base64'].setValue(reader.result);
    };

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

  getBase64(file) {
    var vr = this;



    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

      vr.insertDocForm.controls['base64'].setValue('test');
      // console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  uploadDocument(): void {
    var data = this.insertDocForm.value;
    data.docType = this.selectedDocument;

    var userIcsNo = this.user.icsNo;
    data.userIcsNo = userIcsNo;

    if (data.docType == 'id') {
      data.docName = this.selectedIdentification;
    }

    this.getBase64(this.file);



    this.userService.merchantUploadUserDocument(data, this.file)
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
