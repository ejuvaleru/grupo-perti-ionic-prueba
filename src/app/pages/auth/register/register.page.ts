import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isLoading: boolean = false;
  public registerForm: FormGroup;
  private userToRegister: IUser;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private authService: AuthService, private notificationService: NotificationService,) { }

  ngOnInit() {
    this.initForm();
  }

  // Methods
  onRegister(form: FormGroup) {
    if (!form.valid) return this.notificationService.showNotification("Por favor ingrese todos los datos.");
    if (this.userToRegister.id === null || this.userToRegister.id === '') this.userToRegister.id = new Date().toISOString();
    this.isLoading = true;
    const registerResult = this.authService.onRegister(this.userToRegister);
    if (registerResult.code === 0) return this.notificationService.showNotification(registerResult.message);

    this.isLoading = false;
    this.initForm();
    const loginResult = this.authService.onLogin(this.userToRegister.userName, this.userToRegister.password);
    if (loginResult.code === 0) return this.notificationService.showNotification(loginResult.message);
    
    this.notificationService.showNotification(registerResult.message);
    this.router.navigateByUrl('/');
  }

  onGetRandomUserInfo() {
    this.isLoading = true;
    this.userService.getRandomUserInfo().subscribe((data) => {
      const randomUser = data.results[0];
      const id = randomUser.login.uuid
      const userName = randomUser.login.username;
      const name = randomUser.name.first;
      const lastName = randomUser.name.last;
      const password = randomUser.login.password;

      console.log("---USUARIO INFO---");
      console.log("username " + userName);
      console.log("pass " + password);
      this.initForm(name, lastName, userName, password);

      this.userToRegister = {
        id,
        fullName: name + ' ' + lastName,
        userName,
        password,
        registerDate: new Date(),
      };

      this.isLoading = false;
    });
  }

  // Utils
  initForm(name = '', lastName = '', userName = '', password = '') {
    this.registerForm = this.fb.group({
      name: [name, [Validators.required]],
      lastName: [lastName, [Validators.required]],
      userName: [userName, [Validators.required]],
      password: [password, [Validators.required]],
    });
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }

  hasAlreadyLoggedIn() {
    if (this.authService.isAuthenticated()) return this.router.navigate(['/']);
  }

}
