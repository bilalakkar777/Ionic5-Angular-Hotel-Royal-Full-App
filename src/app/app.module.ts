import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobService } from './services/admob/admob.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutosizeModule } from 'ngx-autosize';
import { AnimationService, AnimatesDirective } from 'css-animator';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { PayPal } from '@ionic-native/paypal/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent,AnimatesDirective],
  entryComponents: [],
  imports: [
    IonicStorageModule.forRoot(),
    AutosizeModule,
    BrowserAnimationsModule,
    BrowserModule, 
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),]
    ,
  providers: [
    PayPal,
    AnimationService,
    StatusBar,
    SplashScreen,
    AdMobFree,
    AdmobService,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
