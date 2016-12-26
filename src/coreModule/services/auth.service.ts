import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FBConnector } from './fb.service';

@Injectable()
export class AuthService {
  JWT_KEY: string = 'auth_token';
  USER_LOGIN_KEY: string = 'user_login';
  signedOut: boolean = true;
  fbCon: FBConnector;

  constructor(private api: ApiService) {
    const token = window.localStorage.getItem(this.JWT_KEY);
    const userData = JSON.parse(window.localStorage.getItem(this.USER_LOGIN_KEY));
    if (token) {
      this.setJwt(token, userData);
    }
    this.fbCon = new FBConnector('146304119153281');
    this.fbCon.initFB();
  }

  setJwt(jwt: string, userData: any) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    window.localStorage.setItem(this.USER_LOGIN_KEY, JSON.stringify(userData));
    this.api.setHeaders({ Authorization: `JWT ${jwt}` });
    this.signedOut = false;
  }

  signIn(creds): Observable<any> {
    return this.api.post(`/signin`, creds)
      .do(res => this.setJwt(res.token, res.data))
      .map(res => res.data);
  }

  register(creds): Observable<any> {
    return this.api.post(`/signup`, creds)
      .do(res => this.setJwt(res.token, res.data))
      .map(res => res.data);
  }

  fbLogin() {
    return Observable.create(observer => {
      let accessToken;
      (<any>window).FB.login((response: any) => {
        if (response.status === 'connected') {
          accessToken = response.authResponse.accessToken;
          return (<any>window).FB.api('/me', 'GET', (response: any) => observer.next({ login: response.name, token: accessToken, userId: response.id }))
        }
        return observer.error();
      })
    })
      .flatMap(res => this.api.post(`/fbLogin`, res))
      .do(res => this.setJwt(res.token, res.data))
      .map(res => res.data);
  }

  signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    window.localStorage.removeItem(this.USER_LOGIN_KEY);
    this.signedOut = true;
  }
}