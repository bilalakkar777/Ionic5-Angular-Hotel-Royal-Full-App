import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HotelsDetailsPage } from './hotels-details.page';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { FivStepperModule } from '@fivethree/core';

import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const routes: Routes = [
  {
    path: '',
    component: HotelsDetailsPage
  }
];

@NgModule({
  imports: [
    FivStepperModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [HotelsDetailsPage],
  entryComponents: []

})
export class HotelsDetailsPageModule {}
