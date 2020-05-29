import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';

import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LocationPickerComponent,
    MapModalComponent,
    ImagePickerComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,    
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
],
  exports: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
