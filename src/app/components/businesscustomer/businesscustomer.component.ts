import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MerchantService } from '../../services/merchant.service';
import { NgbModal, NgbDateStruct, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-businesscustomer',
  templateUrl: './businesscustomer.component.html',
  styleUrls: ['./businesscustomer.component.less']
})
export class BusinesscustomerComponent implements OnInit {

  merchantUsers: any;
  amountPages: any = false;
  currentPage: any = null;
  amountPerPage: any = false;
  amountCustomers: any = false;
  amountPagingBtns: number = 5;
  closeResult: string;
  searchPageForm: any;

  constructor(
    private merchantService: MerchantService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    public globals: Globals
  ) { }

  ngOnInit() {
    this.searchPageForm = this.formBuilder.group({
      pageNr: ['']
    });

    this.getPaymentExpiration();

    this.route.params.subscribe(routeParams => {
      if (routeParams.page && routeParams.amount) {
        var data: any = { amount: routeParams.amount, page: routeParams.page }
        this.getMerchantUsers(data);
        this.currentPage = routeParams.page;
        this.amountPerPage = routeParams.amount;
      }
    });
  }

  userClick(item, content) {
    if (item.granted == 1) {
      this.router.navigate(['/business/user/' + item.icsNo]);
    } else {
      this.open(content);
    }
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

  getPaymentExpiration(): void {
    this.paymentService.getPaymentExpiration()
    .subscribe(data => {
      this.globals.expired = data.expired;
    });
  }

  goToPage() {
    if (this.searchPageForm.invalid) {
      return;
    }

    this.route.params.subscribe(routeParams => {
      if (routeParams.page && routeParams.amount) {
        this.router.navigate(['/business/customers/' + this.searchPageForm.value.pageNr + '/' + routeParams.amount]);
        this.modalService.dismissAll();
      }
    });

  }

  counter(i: number) {
    let x: any = false;
    if (this.amountPages > this.amountPagingBtns) {
      x = new Array(this.amountPagingBtns);
    } else {
      x = new Array(i);
    }
    return x;
  }

  getMerchantUsers(data) {
    this.globals.isLoading = true;
    this.merchantService.getMerchantUsers(data)
      .subscribe(data => {
       
        this.merchantUsers = data.data;
        this.amountPages = data.pages;
        this.amountCustomers = data.amountCustomers;
        this.globals.isLoading = false;
      });
  }

}
