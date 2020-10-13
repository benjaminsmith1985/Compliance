import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../services/merchant.service';
import { CheckinService } from '../../services/checkin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkinform',
  templateUrl: './checkinform.component.html',
  styleUrls: ['./checkinform.component.less']
})
export class CheckinformComponent implements OnInit {
  checkinForm: FormGroup;
  merchant: any;
  submitted: any = false;
  checkedIn: any = false;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private checkinService: CheckinService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.checkinForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      telephone: ['']
    });

    this.route.params.subscribe(routeParams => {
      if (routeParams.m) {

        let branchId = routeParams.b ? routeParams.b : null;

        let postData = {
          "icsNo": routeParams.m,
          "branchId": branchId
        }
        this.getMerchantById(postData);
      }
    });



  }

  getMerchantById(id) {
    this.merchantService.getMerchantById(id)
      .subscribe(data => {
        this.merchant = data.data;
      });
  }

  onSubmit() {
    let vm = this;
    this.submitted = true;

    // stop here if form is invalid
    if (this.checkinForm.invalid) {
      return;
    }

    // this.loading = true;

    this.checkinForm.value.merchantIcsNo = this.merchant.icsNo;
    this.checkinForm.value.branchId = this.merchant.branchId;

    this.checkinService.checkInUser(this.checkinForm.value)
      .subscribe(data => {
        alert("You have successfully checked In");
         this.checkinForm.reset();
      });

  }

}
