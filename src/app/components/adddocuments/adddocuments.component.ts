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

  user: any;

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
      if (routeParams.userIcs) {
       
      }
    });
  }

}
