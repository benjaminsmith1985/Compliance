import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DocumentService } from '../../services/document.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requestdocument',
  templateUrl: './requestdocument.component.html',
  styleUrls: ['./requestdocument.component.less']
})
export class RequestdocumentComponent implements OnInit {
  user: any;
  requestDocForm: FormGroup;

  constructor(
    private userService: UserService,
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.userIcs) {
        this.getUserByIcsNo(routeParams.userIcs);
      }
    });

    this.requestDocForm = this.formBuilder.group({
      documentType: ['id'],
      documentName: [''],
      request: [],
    });
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  submit(): void {
    this.requestDocForm.value.userIcsNo = this.user.icsNo;
    var data = this.requestDocForm.value;
  
    this.documentService.requestDocument(data)
      .subscribe(response => {
       console.log(response);
      });
  }

}
