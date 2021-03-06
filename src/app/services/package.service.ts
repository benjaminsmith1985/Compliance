import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }
 
  getPackages():any {
    return this.http.get(`${this.globals.serverlink}get_packages.php`);  
  } 
}
