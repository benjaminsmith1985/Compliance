import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MerchantService } from '../../services/merchant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LegaformService } from '../../services/legaform.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchanteditaccount',
  templateUrl: './merchanteditaccount.component.html',
  styleUrls: ['./merchanteditaccount.component.less']
})
export class MerchanteditaccountComponent implements OnInit {
  occupationalGroups: any;
  editAccountForm: FormGroup;
  user: any;
  legalforms: any;


  constructor(
    private userService: UserService,
    private merchantService: MerchantService,
    private formBuilder: FormBuilder,
    private legalformService: LegaformService,
    private router: Router
  ) { }

  ngOnInit() {

    this.editAccountForm = this.formBuilder.group({
      reportersCode: [''],
      email: [''],
      streetName: [''],
      streetNumber: [''],
      place: [''],
      country: [''],
      phone: [''],
      legalForm: [''],
      companyname: [''],
      tradename: [''],
      chamberno: [''],
      occgroup: ['']
    });

    this.getOccupationalGroups();
    this.getLegalforms();
    this.getAccountInfo();
  }

  setValue(data: any): void {
    this.editAccountForm.setValue({
      email: data.email,
      streetName: data.address,
      streetNumber: data.streetNumber,
      place: data.place,
      companyname: data.name,
      tradename: data.tradeName,
      chamberno: data.chamberNo,
      occgroup: data.occupationalgroupId,
      legalForm: data.legalForm,
      phone: data.telephone,
      country: data.country,
      reportersCode: data.reportersCode
    });
  }

  getAccountInfo() {
    this.userService.getAccountInfo()
      .subscribe(data => {
        this.setValue(data.data);
        this.user = data.data;
      });
  }

  getLegalforms() {
    this.legalformService.getLegalforms()
      .subscribe(data => {
        this.legalforms = data.data;
      });
  }

  getOccupationalGroups(): void {
    this.userService.getOccupationalGroups()
      .subscribe(data => {
        this.occupationalGroups = data.data;
      });
  }

  update(): void {
    if (this.editAccountForm.invalid) {
      return;
    }

    var data = this.editAccountForm.value;

    this.merchantService.updateMerchantAccount(data)
      .subscribe(data => {
        this.router.navigate(['/merchantaccount']); 
      });
  }
}
