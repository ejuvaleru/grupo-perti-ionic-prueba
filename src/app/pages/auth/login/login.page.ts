import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.hasAlreadyLoggedIn();
    this.initForm();
  }

  // Methods
  onLogin(form: FormGroup) {
    if (!form.valid) return alert("Por favor ingrese los datos solicitados.");

    const userName = form.value.userName;
    const password = form.value.password;

    const result = this.authService.onLogin(userName, password);

    this.router.navigateByUrl('');
  }


  // Helpers
  initForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  goToRegisterPage() {
    this.router.navigateByUrl('/register');
  }

  hasAlreadyLoggedIn() {
    if (this.authService.isAuthenticated()) return this.router.navigate(['']);
  }

}
