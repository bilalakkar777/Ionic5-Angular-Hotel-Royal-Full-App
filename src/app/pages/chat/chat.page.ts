import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

//----------- UI Chats with Support;

   messages = [
    {
      user: 'Me',
      createdAt: 1554090856000,
      msg: 'Hi!'
    },
    {
      user: 'Support',
      createdAt: 1554090956000,
      msg: 'hellow sir, how may i help you'
    },
    {
      user: 'Me',
      createdAt: 1554091056000,
      msg: 'Just Test'
    }
  ];

  currentUser = 'Me';
  newMsg = '';
  @ViewChild(IonContent) content: IonContent;

  constructor(
    public sidebar: SidebarService,
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
  }


  sendMessage() {
    this.messages.push({
      user: 'Me',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.newMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }
}
