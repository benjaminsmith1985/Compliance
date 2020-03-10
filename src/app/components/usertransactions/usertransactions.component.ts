import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { GoogleCharts } from 'google-charts';


@Component({
  selector: 'app-usertransactions',
  templateUrl: './usertransactions.component.html',
  styleUrls: ['./usertransactions.component.less']
})
export class UsertransactionsComponent implements OnInit {
  weeklyTransactions: any;
  transactions: any;
  user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {

      if (routeParams.userIcs) {
        this.getUserTransactions(routeParams.userIcs);
        this.getUserByIcsNo(routeParams.userIcs);
        this.getUserWeeklyTransactions(routeParams.userIcs)
      }
    });


  }

  drawChart(transactions:any) {

    // Standard google charts functionality is available as GoogleCharts.api after load
    // const data = GoogleCharts.api.visualization.arrayToDataTable([
    //   ["Chart thing", "Amount (ANG)"], ["January 21, 2020", 32], ["March 11, 2020", 544]
    // ]);
    const data = GoogleCharts.api.visualization.arrayToDataTable(transactions); 
    const columnChart = new GoogleCharts.api.visualization.LineChart(document.getElementById('chart1'));
    columnChart.draw(data);
  }

  getUserByIcsNo(icsNo) {
    this.userService.getUserByIcsNo(icsNo)
      .subscribe(data => {
        this.user = data.data;
      });
  }  

  getUserWeeklyTransactions(userIcs): void {
    var self = this;
    this.userService.getUserWeeklyTransactions(userIcs)
      .subscribe(data => {
        var transactions = data.data; 

        GoogleCharts.load(function(){
          self.drawChart(transactions); 
        });
      });
  }

  getUserTransactions(userIcs): void {
    this.userService.getUserTransactions(userIcs)
      .subscribe(data => {
        this.transactions = data.data;


        console.log(data.data);
      });
  }

}
