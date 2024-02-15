import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { TokenBearer } from '../token-bearer.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {

  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<DialogLoginComponent>) { }


  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.loginService.login({ username: loginData.username, password: loginData.password }).subscribe({
        next: (res) => {
          // Assumindo que res já é do tipo esperado, caso contrário, faça a validação necessária
          console.log(res);
          const tokenData: TokenBearer = {
            access_token: res.access_token,
            expires_in: res.expires_in
          };

          // Armazena o token no localStorage
          localStorage.setItem('access_token', tokenData.access_token);
          this.dialogRef.close();

          this.router.navigate(['/admin'])


          // Aqui, você pode fazer o que mais precisar com tokenData
          console.log('Login successful', tokenData);
        },
        error: (error) => console.error('Login failed', error)
      });
    }
  }
}
