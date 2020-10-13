import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbDateStruct, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CheckinService } from '../../services/checkin.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.less']
})
export class CheckinComponent implements OnInit {
  customers: any;
  checkinForm: FormGroup;

  constructor(
    private checkinService: CheckinService,
    public globals: Globals,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {   
    this.getMerchantUsers();   
    this.checkinForm = this.formBuilder.group({
      checkinDate: ['']
    });
  }  

  getMerchantUsers(date = null) {  
    this.checkinService.getCheckInsByMerchant(date)
      .subscribe(data => {
        if(data.data){
          this.customers = data.data;
        }       
      });
  }

  onDateSelect(){
    let date = this.checkinForm.value.checkinDate;  
    this.getMerchantUsers(date); 
  }

}
