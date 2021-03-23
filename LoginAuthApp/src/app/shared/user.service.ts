import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selecteduser: User = {
    fullname: '',
    email: '',
    password: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ noauth: 'true' }) };

  constructor(private http: HttpClient) {}

  postuser(data: any): Observable<any> {
    return this.http.post(
      environment.baseurl + '/register',
      data,
      this.noAuthHeader
    );
  }

  login(authCredentials): Observable<any> {
    return this.http.post(
      environment.baseurl + '/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get(environment.baseurl + '/userprofile');
  }

  setToken(token: any) {
    localStorage.setItem('token', token);
  }

  getToken() {
    localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    let token = localStorage.getItem('token');
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else return false;
  }
}
