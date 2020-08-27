import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchanteditaccount',
  templateUrl: './merchanteditaccount.component.html',
  styleUrls: ['./merchanteditaccount.component.less']
})
export class MerchanteditaccountComponent implements OnInit {
  occupationalGroups:any;
  editAccountForm: FormGroup;
  user: any;
  

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
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
    this.getAccountInfo();
  }

  setValue(data: any): void {
    this.editAccountForm.setValue({
      email: data.email,
      streetName: data.address,
      streetNumber: data.streetNumber,
      place: 'Willemstad',
      companyname: data.name,
      tradename: data.tradeName,
      chamberno: data.chamberNo,
      occgroup: data.occupationalgroupId,
      legalForm: data.legalForm,
      phone: data.telephone,
      country: 'Curacao',
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

  getOccupationalGroups(): void {
    this.userService.getOccupationalGroups()
      .subscribe(data => {    
          this.occupationalGroups = data.data;  
      });
  }

}
