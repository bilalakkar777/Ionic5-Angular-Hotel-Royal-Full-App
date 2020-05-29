import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import {PopoverController} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { LangComponent } from './lang/lang.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage {

  profilePic: String;
  loading: boolean = true;
  timestamp: any;
  lang: string;
  arabic: boolean;
  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private popoverController: PopoverController,
    public sidebar: SidebarService
  ) {
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
  }


//-------------- change Language From component {{ lang }} 
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
}
