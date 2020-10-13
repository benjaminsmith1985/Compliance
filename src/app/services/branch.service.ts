import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(
    private http: HttpClient,
    private globals: Globals) { }

  addBranch(data): any {
 
    return this.http.post(`${this.globals.serverlink}add_branch.php`, data);
  }
}
