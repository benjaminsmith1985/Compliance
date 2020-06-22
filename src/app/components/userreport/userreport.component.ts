import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-userreport',
  templateUrl: './userreport.component.html',
  styleUrls: ['./userreport.component.less']
})
export class UserreportComponent implements OnInit {

  transaction: any;
  transactionReports: any;
  attachedDocs: any;
  operation: any;
  user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.transactionId) {
        this.getUserTransaction(routeParams.transactionId);
        this.getUserTransactionReports(routeParams.transactionId);
        this.getMerchantAttachedDocs(routeParams.transactionId);
        this.getOperationByUuid(routeParams.transactionId);
        this.getAccountInfo();
      }
    });
  }

  getAccountInfo() {
    this.userService.getAccountInfo()
      .subscribe(data => {
        this.user = data.data;
      });
  }

  getMerchantAttachedDocs(uuid): void {
    this.userService.getMerchantAttachedDocs(uuid)
      .subscribe(data => {
        this.attachedDocs = data.data;
      });
  }

  getUserTransactionReports(transactionId): void {
    this.userService.getReportsByOperationUuid(transactionId)
      .subscribe(data => {
        this.transactionReports = data.data;
      });
  }


  // getUserReport(uuid): void {
  //   this.userService.getUserTransactionReports(uuid)
  //     .subscribe(data => {
  //       this.transactionReports = data.data;

  //       this.getUserTransaction(data.data.uuid);
  //       this.getMerchantAttachedDocs(data.data.uuid);
  //       this.getOperationByUuid(data.data.uuid);
  //     });
  // }

  

  openPdf(uuid): void {
    var params = JSON.parse(localStorage.getItem('currentUser'));
    params.ui = uuid;
    var url_generating_pdf = "http://localhost/complianceServer/manual_reporting.php/";
    // var url = [url_generating_pdf, $.param(params)].join('?');

    var url = url_generating_pdf + '?token=' + params.token + '&ui=' + uuid;
    //  var url = "";
    window.open(url);
  }

  getOperationByUuid(uuid): void {
    this.userService.getOperationByUuid(uuid)
      .subscribe(data => {
        this.operation = data.data;
      });
  }

  getUserTransaction(uuid): void {
    this.userService.getUserTransaction(uuid)
      .subscribe(data => {
        this.transaction = data.data;
        console.log(data.data);
      });
  }


}
