import { Component, OnInit } from '@angular/core';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.page.html',
  styleUrls: ['./hotels.page.scss'],
})
export class HotelsPage implements OnInit {

  constructor(    
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
  }
  
  ngOnInit() {
  }

}
