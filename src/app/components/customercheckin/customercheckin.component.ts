import { Component, OnInit } from '@angular/core';
import { CheckinService } from '../../services/checkin.service';
import { MerchantService } from '../../services/merchant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LegaformService } from '../../services/legaform.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-customercheckin',
  templateUrl: './customercheckin.component.html',
  styleUrls: ['./customercheckin.component.less']
})
export class CustomercheckinComponent implements OnInit {
  editUserCheckinForm: FormGroup;
  checkinUser: any;


  constructor(
    private checkinService: CheckinService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.editUserCheckinForm = this.formBuilder.group({
      remarks: [''], 
      checkinId: []
    });

    this.route.params.subscribe(routeParams => {
      if (routeParams.checkinId) {
        this.getCheckinById(routeParams.checkinId);
      }
    });


  }

  getCheckinById(id) {
    this.checkinService.getByCheckinId(id)
      .subscribe(data => {
        this.checkinUser = data.data;
        this.setValue(data.data)
      });
  }

  setValue(data: any): void {
    this.editUserCheckinForm.setValue({
      remarks: data.remarks,
      checkinId: data.checkinId
    });
  }



  update(): void {
    if (this.editUserCheckinForm.invalid) {
      return;
    }

    
    var data = this.editUserCheckinForm.value;

    this.checkinService.updateCheckinCustomer(data)
      .subscribe(data => {
        this.router.navigate(['/checkin']);
      });
  }
}
