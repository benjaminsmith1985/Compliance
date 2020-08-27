import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbModal, NgbDateStruct, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-userdocuments',
  templateUrl: './userdocuments.component.html',
  styleUrls: ['./userdocuments.component.less']
})
export class UserdocumentsComponent implements OnInit {
  user: any;
  userDocuments: any;
  currentDocument: any;
  modal: any;
  closeResult: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router,
    private modalService: NgbModal
  ) {

  }

  openDoc(item, content) {
    this.currentDocument = item;
    if (item.permission == '1') {
      this.router.navigate(['/business/userid/' + item.userIcsNo + '/' + item.documentId]);
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
    //  this.insertIdForm.reset();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     // this.insertIdForm.reset();
      return 'by clicking on a backdrop';
    } else {
     // this.insertIdForm.reset();
      return `with: ${reason}`;
    }

  }



  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.userIcs) {
        this.getUserByIcsNo(routeParams.userIcs);
        this.getCustomerDocuments(routeParams.userIcs);
      }
    });
  }

  getCustomerDocuments(id): void {
    this.userService.getMerchantCustomerDocuments(id)
      .subscribe(data => {
        this.userDocuments = data.data;
      });
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }


}
