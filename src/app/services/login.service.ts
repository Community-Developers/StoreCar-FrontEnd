import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../shared/login-data.interface';
import { TokenBearer } from '../shared/token-bearer.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private url: string = 'https://load10-1661520641.us-east-2.elb.amazonaws.com/login';

  public login(loginData: LoginData): Observable<TokenBearer> {
    return this.http.post<TokenBearer>(this.url, loginData);
  }

}
