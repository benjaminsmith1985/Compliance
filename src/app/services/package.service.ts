import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private link: String = "http://localhost/complianceServer";

  // private link: String = 'http://108.179.196.226/~ics';

  constructor(private http: HttpClient) { }
 
  getPackages():any {
    return this.http.get(`${this.link}/get_packages.php`);  
  } 
}
