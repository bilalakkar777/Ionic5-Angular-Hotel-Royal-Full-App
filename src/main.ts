import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@ionic/pwa-elements';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//import 'web-animations-js/web-animations.min';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
