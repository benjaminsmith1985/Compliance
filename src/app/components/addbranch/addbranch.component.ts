import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BranchService } from '../../services/branch.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addbranch',
  templateUrl: './addbranch.component.html',
  styleUrls: ['./addbranch.component.less']
})
export class AddbranchComponent implements OnInit {

  branchForm: FormGroup;
  user: any;
  closeResult: string;

  constructor(
    private userService: UserService,
    private branchService: BranchService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.branchForm = this.formBuilder.group({
      branchName: [''],
      branchAddress: ['']
    });
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  submitBranch(): void {
    if (this.branchForm.invalid) {
      return;
    }

    this.insertBranch();
  }

  insertBranch(): void {
    this.branchService.addBranch(this.branchForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/merchantaccount/branches']);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }


}
