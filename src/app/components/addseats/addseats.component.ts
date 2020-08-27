import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MerchantService } from '../../services/merchant.service';
import { CustomerService } from '../../services/customer.service';
import { DocumentService } from '../../services/document.service';
import { PaymentService } from '../../services/payment.service';
import { Globals } from '../../globals';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-addseats',
  templateUrl: './addseats.component.html',
  styleUrls: ['./addseats.component.less']
})
export class AddseatsComponent implements OnInit {
  addSeatsForm: FormGroup;
  user: any;
  closeResult: string; 

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {  
    this.addSeatsForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email:['']
    });
  }  

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  submitSeats(): void {
    if (this.addSeatsForm.invalid) {
      return;
    }

    this.insertSeats();
  }
  
  insertSeats(): void {
    this.userService.insertSeats(this.addSeatsForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/merchantaccount/seats']); 
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

}
