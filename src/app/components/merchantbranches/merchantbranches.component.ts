import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-merchantbranches',
  templateUrl: './merchantbranches.component.html',
  styleUrls: ['./merchantbranches.component.less']
})
export class MerchantbranchesComponent implements OnInit {
  branches: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getBranches();
  }

  getBranches() {    
    this.userService.getBranches()
      .subscribe(data => {
        this.branches = data.data;
      });
  }
 

}
