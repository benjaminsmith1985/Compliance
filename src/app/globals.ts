import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class Globals {
    expired: 0;
    serverlink: string = "http://localhost/complianceServer/"; 
    isLoading: boolean = false;
    //serverlink:string = "complianceServer/";
}   