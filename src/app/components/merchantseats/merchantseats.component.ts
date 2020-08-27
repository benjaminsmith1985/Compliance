import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-merchantseats',
  templateUrl: './merchantseats.component.html',
  styleUrls: ['./merchantseats.component.less']
})
export class MerchantseatsComponent implements OnInit {
  seats:any = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getSeats();
  }

  getSeats() {
    this.userService.getSeats()
      .subscribe(data => {
        this.seats = data.data;
      });
  }


}
