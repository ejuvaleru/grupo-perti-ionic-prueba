import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/message';
import { IUser } from '../interfaces/user';
import { StorageService } from './storage.service';
const USERS_KEY = 'USERS_KEY';
const SINGLE_USER_KEY = 'SINGLE_USER_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService) { }

  // Methods
  onRegister(user: IUser): IMessage {
    const usersFromDB = this.getUsersFromDB();
    usersFromDB.push(user);
    this.storageService.saveToStorage(USERS_KEY, usersFromDB);
    return { code: 1, message: 'Registro exitoso.' };
  }

  onLogin(userName: string, password: string): IMessage {
    const usersFromDB = this.getUsersFromDB();
    const user = usersFromDB.find(item => item.userName === userName && item.password === password);
    if (!user) return { code: 0, message: 'Error. Las credenciales no coinciden.' };

    this.storageService.saveToStorage(SINGLE_USER_KEY, user);
    return { code: 1, message: 'Inicio de sesión exitoso.' };
  }

  onLogout() {
    this.storageService.clearOneItem(SINGLE_USER_KEY);
  }

  // Helpers
  getUsersFromDB(): IUser[] {
    return this.storageService.getFromStorage(USERS_KEY) || [];
  }

  isAuthenticated(): boolean {
    return this.storageService.registerExists(SINGLE_USER_KEY);
  }

  getCurrentUser(): IUser {
    return this.storageService.getFromStorage(SINGLE_USER_KEY);
  }
}
