import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PopoverController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent {
  
  credentialsForm: FormGroup;
  profilePic: string;
  constructor(
    private popController: PopoverController,
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
  }

  onSubmit(lang: string) {
    this.popController.dismiss(lang);
  }

  async cancel() {
    await this.popController.dismiss(null);
  }
}
