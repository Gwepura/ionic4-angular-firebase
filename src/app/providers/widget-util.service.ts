import { Injectable } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { Button } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {

  constructor(private toastController: ToastController, private platform: Platform) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: this.platform.is('desktop') ? 'top' : 'bottom',
      duration: 1500,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    toast.present();
  }
}
