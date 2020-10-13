import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { Globals } from '../../globals';


@Component({
  selector: 'app-passwordset',
  templateUrl: './passwordset.component.html',
  styleUrls: ['./passwordset.component.less']
})
export class PasswordsetComponent implements OnInit {

  setPasswordForm: FormGroup;
  customerPage: any;
  merchantPage: any;
  submitted = false;
  registerCustomerForm: FormGroup;
  registerMerchantForm: FormGroup;
  loading = false;
  returnUrl: string;
  currentUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public globals: Globals
  ) { }


  ngOnInit() {
    this.setPasswordForm = this.formBuilder.group({
      icsNo: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, [Validators.required, Validators.minLength(2)]],
      retypepassword: [null, [Validators.required, Validators.minLength(2)]],
      code: [null, [Validators.required, Validators.minLength(2)]],
      userType: [null, [Validators.required, Validators.minLength(2)]]
    });

    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser) {
      this.router.navigate(['/search']);
    }

    this.route.params.subscribe(routeParams => {

      if (routeParams.icsNo && routeParams.code && routeParams.userType) {
        let data = {
          icsNo: routeParams.icsNo, 
          code: routeParams.code,
          userType: routeParams.userType
        }

        this.confirmActivationCode(data);
      }
    });
  }

  confirmActivationCode(postData: any): void {
    this.userService.confirmActivationCode(postData)
    .subscribe(data => {
      if(data.data){
        this.setValue(postData);
      }else{
        // this.router.navigate(['/login']);
      }
    });    
  }

  resetPassword(data: any): void {
    this.userService.resetPassword(data)
    .subscribe(data => {
      this.globals.isLoading = false;
      this.setPasswordForm.reset;
    });    
  }

  setValue(data: any): void {
    this.setPasswordForm.setValue({
      icsNo: data.icsNo,
      password: null,
      retypepassword: null,
      code: data.code,
      userType: data.userType
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.setPasswordForm.invalid) {
      alert('The information you provided is icorrect.');
      return;
    }

    // this.globals.isLoading = true;
  
    this.resetPassword(this.setPasswordForm.value);

  }

}
