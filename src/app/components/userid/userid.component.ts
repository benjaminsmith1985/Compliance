import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-userid',
  templateUrl: './userid.component.html',
  styleUrls: ['./userid.component.less']
})
export class UseridComponent implements OnInit {
  user: any;
  doc: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.userIcs && routeParams.docId) {
        this.getUserByIcsNo(routeParams.userIcs);
        this.getUserDocById(routeParams.userIcs, routeParams.docId);
      }
    });
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  getUserDocById(userIcsNo, docId) {
    this.userService.getUserDocById(userIcsNo, docId)
      .subscribe(data => {
        this.doc = data.data;
      });
  }

  verifyDocument(): void {
    if (this.doc) {
      this.userService.fydoc(this.doc, 'verify')
        .subscribe(data => {
          this.route.params.subscribe(routeParams => {
            if (routeParams.userIcs && routeParams.docId) {
              this.getUserByIcsNo(routeParams.userIcs);
              this.getUserDocById(routeParams.userIcs, routeParams.docId);
            }
          });
        });
    }
  }

}
