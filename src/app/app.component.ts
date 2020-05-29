import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarService } from './services/sidebar/sidebar.service';
import { AuthService } from './services/Authentication/auth.service';

import { Plugins, Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  loader = false;
  clickSub: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public sidebar: SidebarService,
    private authService : AuthService,
    private localNotifications: LocalNotifications, 
    public alertController: AlertController,
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
    
    this.initializeApp();
  }

  initializeApp() {
  /*  this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });*/
   /* this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });*/
    this.platform.ready().then(() => {
      this.statusBar.hide();
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      console.log('ionViewDIdEnter');
      // Keyboard.disableScroll(true);
    });
  }

  ionViewWillLeave() {
    this.platform.ready().then(() => {
      // Keyboard.disableScroll(false);
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }

  /**
	 * Prepares the outlet for transition animations
	 *
	 * @param outlet The router outlet object
	 */
  prepareRoute(outlet: RouterOutlet): void {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  isOuterPage(): boolean {
    return (
      this.router.url.includes('login') ||
      this.router.url.includes('register') ||
      this.router.url.includes('reset-password')
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'notifiations local',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  unsub() {
    this.clickSub.unsubscribe();
  }
  simpleNotif() {
    this.clickSub = this.localNotifications.on('click').subscribe(data => {
      console.log(data);
      this.presentAlert('This is notifiations local, You can also send notifiations from Firebase');
      this.unsub();
    });
    this.localNotifications.schedule({
      id: 1,
      text: 'This is notifiations local, You can also send notifiations of Firebase',
      data: { secret: 'secret' }
    });

  }


}
