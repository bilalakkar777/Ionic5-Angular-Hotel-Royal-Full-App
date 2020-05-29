import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CheckboxComponent]
})
export class CheckboxModule { }
