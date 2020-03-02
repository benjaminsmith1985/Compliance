import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CustomerService } from '../../services/customer.service';
import { UploadService } from '../../services/upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../models/customer';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.less']
})
export class CustomerComponent implements OnInit {
  customer: any;
  user: any;
  detailsForm: FormGroup;
  uploadIdForm: FormGroup;
  identificationDocuments: any;
  error: string;
  uploadResponse = { status: '', message: '' };

  submitted = false;
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.detailsForm = this.formBuilder.group({
      address: ['', Validators.required],
      place: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.uploadIdForm = this.formBuilder.group({
      idType: ['id'],
      idName: ['', Validators.required],
      expirationDate: ['', Validators.required],
      document: ['']
    });

    this.getUser();
    this.getCustomerDocuments();
  }

  getUser(): void {
    this.userService.getCustomer()
      .subscribe(data => {
        this.user = data.data;
        this.detailsForm = this.formBuilder.group({
          address: [data.data.address, Validators.required],
          place: [data.data.place, Validators.required],
          country: [data.data.country, Validators.required]
        });
      });
  }

  getCustomerDocuments(): void {
    this.customerService.getCustomerDocuments()
      .subscribe(data => {
        this.identificationDocuments = data.data;
      });
  }



  get f() { return this.detailsForm.controls; }

  changeDetails() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.detailsForm.invalid) {
      return;
    }

    this.loading = true;



    this.userService.updateDetails(this.detailsForm.value)
      .pipe(first())
      .subscribe(
        data => {

          this.getUser();

          this.detailsForm.reset();
          window['$']('#changeDetailsModal')['modal']('hide');

        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadIdForm.get('document').setValue(file);
    }
  }

 

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadIdForm.get('document').value);
    formData.append('idType', this.uploadIdForm.get('idType').value);
    formData.append('idName', this.uploadIdForm.get('idName').value);


    this.uploadService.upload(formData).subscribe(
      (res) => {
        // self.uploadResponse = res;
        window['$']('#identificationDocModal')['modal']('hide');
        this.getCustomerDocuments();

      },
      (err) => this.error = err
      // (res) => this.uploadResponse = res,
      // (err) => this.error = err
    );
  }
}
