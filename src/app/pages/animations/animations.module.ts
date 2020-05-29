import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnimationsPage } from './animations.page';
import { FivStepperModule } from '@fivethree/core';

const routes: Routes = [
  {
    path: '',
    component: AnimationsPage
  }
];

@NgModule({
  imports: [
    FivStepperModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnimationsPage]
})
export class AnimationsPageModule {}
