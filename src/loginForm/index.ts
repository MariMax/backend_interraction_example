import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../coreModule/services/auth.service';

@Component({
  selector: 'login-form',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [
    './styles.css'
  ],
  template: require('./template.html')
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn(creds) {
    const subscription = this.authService.signIn(creds)
      .subscribe(() => subscription.unsubscribe(),
      () => {
        this.loginForm.controls['password']['setValue']('');
        subscription.unsubscribe()
      });
    return false;
  }

  fbLogin() {
    const subscription = this.authService.fbLogin()
      .subscribe(() => subscription.unsubscribe(), () => subscription.unsubscribe());
    return false;

  }

  register(creds) {
    const subscription = this.authService.register({
      login: creds.login,
      password: creds.password,
      confirmation: creds.password
    })
      .subscribe(() => subscription.unsubscribe(), () => subscription.unsubscribe());
    return false;
  }
}