import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Globals } from '../../globals';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public globals: Globals,
    private authenticationService: AuthenticationService
  ) {

    // redirect to dashboard if already logged in 
    // if (this.authenticationService.currentUserValue) {
    //   switch (this.authenticationService.currentUserValue.role) {
    //     case 'business':
    //     this.router.navigate(['/business']);
    //       break;
    //     case 'customer':
    //       this.router.navigate(['/customer']);
    //       break;
    //   }
    // }  
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      icsNo: ['', Validators.required],
      password: ['', Validators.required],
      email: ['']
    });

    // get return url from route parameters or default to '/'
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/search']);
    }
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(role) {
    console.log('submit');

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }


    this.loading = true;

    this.loginForm.value.role = role;

    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          switch (role) {
            case 'business':
              console.log('data');
              this.router.navigate(['/search']);
              break; 
            case 'customer':
              console.log('data');
              this.router.navigate(['/customer']);
              break;
          }

          this.loginForm.reset();


        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }
}
