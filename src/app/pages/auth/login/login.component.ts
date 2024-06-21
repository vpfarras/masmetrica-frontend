import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseFormUser } from '@shared/utils/base-form-user';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public loginForm: BaseFormUser
  ) {}

  ngOnInit(): void {
    this.loginForm.baseFormLogin.get('role').setValidators(null);
    this.loginForm.baseFormLogin.get('role').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    if (this.loginForm.baseFormLogin.invalid) {
      return;
    }

    const formValue = this.loginForm.baseFormLogin.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['/perfil']);
        }
      })
    );
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }

  goToRecoverPassword(): void {
    console.log('goToRecoverPassword 2')
    this.router.navigate(['/recoveryPassword'])
  }

  goToRegister(): void {
    this.router.navigate(['/register'])
  }
}
