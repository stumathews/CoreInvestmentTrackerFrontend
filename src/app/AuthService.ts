import { Injectable } from '@angular/core';


/**
 * Holds Auth state and functionality
 */
@Injectable()
export class AuthService {
    constructor() { }
    setToken(token: string ) {
        console.log('Setting token to ' + token);
        localStorage.setItem('currentUser', token);
    }

    hasValidIdToken(): boolean {
        if (localStorage.getItem('currentUser')) {
            return true; // console.log(`Yes, a valid token: ${this.token}`);
         } else {
            console.log('Nope, could not find currentUser in local session');
             return false;
        }
    }

    getAccessToken(): string {
        const token = localStorage.getItem('currentUser');
        console.log('access token is:' + token);
        return localStorage.getItem('currentUser');
    }

    logout() {
        console.log('removing currentUser');
        localStorage.removeItem('currentUser');
    }
}
