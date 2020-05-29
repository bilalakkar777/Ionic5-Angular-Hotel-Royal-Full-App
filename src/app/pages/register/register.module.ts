import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TextboxModule } from 'src/app/components/textbox/textbox.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { ButtonModule } from 'src/app/components/button/button.module';


import { RegisterPage } from './register.page';


import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TextboxModule,
    ButtonModule,
    CheckboxModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],

  declarations: [RegisterPage]
})
export class RegisterPageModule {}
