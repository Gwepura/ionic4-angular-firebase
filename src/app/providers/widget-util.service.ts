import { Injectable } from '@angular/core';
import { ToastController, Platform, LoadingController } from '@ionic/angular';
import { Button } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {

  loading: any = {};
  constructor(private toastController: ToastController, private platform: Platform, private loadingController: LoadingController) { }

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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
    });
    return await this.loading.present();
  }

  async dismissLoader() {
    await this.loading.dismiss();
  }
}
