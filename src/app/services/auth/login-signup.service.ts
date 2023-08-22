import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  public auth_url = "http://localhost:3000";

  constructor(private apiService: ApiService) { }

  authLogin(user_name: string, password: string): Observable<any> {
    return this.apiService.get(this.auth_url + '/users?email=' + user_name + '&password=' + password);
  }

  userRegister(user_dto: any): Observable<any> {
    return this.apiService.post(this.auth_url + '/users', user_dto);
  }

  recoverPassword(email: string, mobile: string): Observable<any> {
    return this.apiService.get(this.auth_url + '/users?email=' + email + '&mobile=' + mobile);
  }
}
