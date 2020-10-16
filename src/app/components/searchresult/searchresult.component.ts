import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { Globals } from '../../globals';



@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.less']
})
export class SearchresultComponent implements OnInit {
  currentUser: any = false;
  searchResult: any;
  searchType: any = null;
  amountPages: any = false;
  currentPage: any = null;
  amountPerPage: any = false;
  amountResults: any = false;
  amountPagingBtns: number = 3;
  closeResult: string;
  urlData: any;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public globals: Globals,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {

      if (routeParams.data) {
        var data: any = JSON.parse(decodeURIComponent(routeParams.data));
        this.urlData = routeParams.data;
        data.amount = routeParams.amount;
        data.page = routeParams.page;
        if (this.containsEncodedComponents(routeParams.data)) {
          this.searchUser(data);
          this.currentPage = routeParams.page;
          this.amountPerPage = routeParams.amount;
        }
      }
    });
  }

  containsEncodedComponents(x) {
    return (decodeURI(x) !== decodeURIComponent(x));
  }

  go(data) {
    if (data.focusType == 'Customer') {
      this.router.navigate(['business/user/' + data.fwdId]);
    } else if (data.focusType == 'Transaction') {
      this.router.navigate(['usertransaction/' + data.fwdId]);
    }
  }

  viewProfile() {
    this.router.navigate(['/business/user/' + this.currentUser.icsNo]);
    this.modalService.dismissAll();
  }

  createTransaction() {
    this.router.navigate(['/business/newtransaction/' + this.currentUser.icsNo]);
    this.modalService.dismissAll();
  }

  viewTransaction() {
    this.router.navigate(['/usertransaction/' + this.currentUser.fwdId]);
    this.modalService.dismissAll();
  }

  addCustomer(icsNo): void {
    // console.log(icsNo);
    this.userService.addCustomer(icsNo).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/business/customers']);
          this.modalService.dismissAll();
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
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

  searchUser(data: any) {
    // this.globals.isLoading = true;
    this.userService.searchUser(data)
      .pipe(first())
      .subscribe(
        data => {
          this.searchResult = data.data;
          this.amountPages = data.pages;
          this.amountResults = data.amountResults;
          this.searchType = data.searchType;
          this.globals.isLoading = false;
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

  userClick(item: any, ref: any) {
    switch (ref) {
      case 'user':
        this.router.navigate(['/business/user/' + item.icsNo]);
        break;
      case 'checkins':
        this.router.navigate(['/checkin/' + item.checkinId]);
        break;
      case 'transactions':
        this.router.navigate(['/usertransaction/' + item.uuid]);
        break;
    }

  }

  openDialog(content, item) {
    this.currentUser = item;
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

}
