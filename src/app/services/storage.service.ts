import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToStorage(key: string, data: any) {
    const dataString = JSON.stringify(data);
    window.localStorage.setItem(key, dataString)
  }

  getFromStorage(key: string): any {
    const data = JSON.parse(window.localStorage.getItem(key))
    return data;
  }

  clearOneItem(key: string) {
    window.localStorage.removeItem(key);
  }

  clearAll() {
    window.localStorage.clear();
  }

  registerExists(key: string): boolean {
    return window.localStorage.getItem(key) != null
  }
}
