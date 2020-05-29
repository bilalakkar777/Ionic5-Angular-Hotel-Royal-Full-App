import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';

import {PopoverController} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { LangComponent } from './lang/lang.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loader = false;
  clickSub: any;

  ImgURL1 = "./../../../assets/img/giphy.gif";
  ImgURL2 = "./../../../assets/img/hotels.gif"
  ImgURL3 = "./../../../assets/img/booking.gif"
  ImgURL4 = "./../../../assets/img/adsss.jpg"

    constructor(
      private translate: TranslateService,
      private storage: Storage,
      private popoverController: PopoverController,
      public sidebar: SidebarService,
    ) {
      this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
      this.storage.get("lang").then(lang => {
        if (lang) translate.use(lang);
        else storage.set("lang", window.navigator.language.split("-")[0]);
      });
    }
  
  async chooseLang() {
    const popover = await this.popoverController.create({
      component: LangComponent,
      translucent: true
    });
    popover.onDidDismiss().then(lang => {
      if (!lang || !lang.data) return;
      console.log(lang);
      this.storage.set("lang", lang.data).then(res => {
        location.reload();
      });
    });
    return await popover.present();
  }
  ngOnInit() {
  }

}
