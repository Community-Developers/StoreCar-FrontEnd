import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginData } from '../shared/login-data.interface';
import { TokenBearer } from '../shared/token-bearer.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  private url: string = 'https://server.brasilmobis.com/login';

  public login(loginData: LoginData): Observable<TokenBearer> {
    return this.http.post<TokenBearer>(this.url, loginData);
  }


  setAutoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Se o erro for 401, deslogar o usuário
      this.logout();
    }
    // Retornar um Observable com um erro para ser tratado por quem chamou
    return throwError(() => new Error('Não autorizado'));
  }

}
