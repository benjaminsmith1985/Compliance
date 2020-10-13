import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { Globals } from '../../globals';


@Component({
  selector: 'app-accountactivation',
  templateUrl: './accountactivation.component.html',
  styleUrls: ['./accountactivation.component.less']
})
export class AccountactivationComponent implements OnInit {
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
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    public globals: Globals
  ) { }


  ngOnInit() {
    this.setPasswordForm = this.formBuilder.group({
      icsNo: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, [Validators.required, Validators.minLength(2)]],
      retypepassword: [null, [Validators.required, Validators.minLength(2)]]
    });    

    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser) {
      this.router.navigate(['/search']);
    }
  }

  onSubmit(role) {
    this.submitted = true;

    if (this.setPasswordForm.invalid) {
      alert('The information you provided is icorrect.');
      return;
    }

    this.globals.isLoading = true;
    this.loading = true;   

    this.authenticationService.login(this.setPasswordForm.value)
      .pipe(first())
      .subscribe(
        data => {
          switch (role) {
            case 'business':
              this.globals.expired = data.expired;
              this.router.navigate(['/search']);
              this.globals.isLoading = false;
              break;
            case 'customer':
              this.router.navigate(['/customer']);
              window['$']('#loginModal')['modal']('hide');
              break;
          }

          this.setPasswordForm.reset();

          this.globals.isLoading = false;
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }
}
