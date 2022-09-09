import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.hasAlreadyLoggedIn();
    this.initForm();
    this.notificationService.askForPermission();
  }

  // Methods
  onLogin(form: FormGroup) {
    if (!form.valid) {
      return this.notificationService.showNotification("Por favor ingrese los datos solicitados.");
    }

    const userName = form.value.userName;
    const password = form.value.password;

    const result = this.authService.onLogin(userName, password);
    this.notificationService.showNotification(result.message)
    if(result.code === 0) return;
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
