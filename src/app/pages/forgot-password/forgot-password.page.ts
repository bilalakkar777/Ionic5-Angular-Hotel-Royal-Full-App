import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';
  password: string = '';
  error: string = '';
  constructor(
    private fireauth: AngularFireAuth, 
    private router: Router, 
    private toastController: ToastController, 
    public loadingController: LoadingController,
    public alertController: AlertController,    
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: this.translate.instant('forgot-password.Please'),
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

 //--------- recover password from Firebase
  recover() {
    this.fireauth.auth.sendPasswordResetEmail(this.email)
      .then(data => {
        console.log(data);
        this.presentToast(this.translate.instant('forgot-password.Password-reset'), false, 'bottom', 1000);
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

}
