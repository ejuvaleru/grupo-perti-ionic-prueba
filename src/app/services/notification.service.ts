import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private platform: Platform) { }

  askForPermission() {
    if (this.platform.is('android') || this.platform.is('ios')) LocalNotifications.requestPermissions();
  }

  showNotification(msg: string) {
    if (this.platform.is('android') || this.platform.is('ios')) return LocalNotifications.schedule({ notifications: [{ body: msg, id: new Date().getMilliseconds(), title: 'Mensaje' }] });
    else return alert(msg)
  }
}
