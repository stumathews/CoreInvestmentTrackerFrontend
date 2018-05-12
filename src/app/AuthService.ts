import { Injectable } from '@angular/core';


/**
 * Holds Auth state and functionality
 */
@Injectable()
export class AuthService {
    constructor() { }

    private token: string;


    setToken(token: string ) {
        console.log('Setting token to ' + token);
        this.token = token;
    }

    hasValidIdToken(): boolean {
        if (this.token) {
            console.log(`Yes, a valid token: ${this.token}`);
            return true;
         } else {
            console.log(`Nope, not a valid token: ${this.token}`);
             return false;
        }
    }

    getAccessToken(): string {
        // tslint:disable-next-line:max-line-length
        console.log('access token is:' + this.token);
        return this.token;
    }
}
