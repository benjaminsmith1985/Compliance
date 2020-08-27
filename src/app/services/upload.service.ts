import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL: string = "http://localhost/complianceServer";

  // SERVER_URL: String = 'http://108.179.196.226/~ics';

  constructor(
    private httpClient: HttpClient,
    private globals: Globals) { }

  public upload(data) {
    let uploadURL = `${this.globals.serverlink}file_upload.php`;
    var percentage = 0;

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
       

      switch (event.type) {
        
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          percentage = progress;
       
          return { status: 'progress', message: percentage, data: '' };

        case HttpEventType.Response:
      
          return event.body;
         // return { status: 'Body', message: percentage, data: event.body };
        default:
          return `Unhandled event: ${event.type}`;
          //return { status: 'Unhandled event', message: percentage, data: event.type };
      }
    })
    );
  }
}
