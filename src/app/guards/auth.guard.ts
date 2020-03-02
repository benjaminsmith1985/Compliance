import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import * as decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const expectedRole = route.data.expectedRole;
        const currentUser = this.authenticationService.currentUserValue;       

        if (currentUser && currentUser.role === expectedRole) {
            // authorised so return true          
            return true;
        } 
             
        // not logged in so redirect to login page with the return url
       
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    } 
} 