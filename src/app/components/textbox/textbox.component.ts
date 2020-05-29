import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { PlatformStateService } from 'src/app/services/platform-service/platform-service.service';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;

  @Input() parentFormGroup: FormGroup;
  @Input() textboxFormControlName: FormControlName;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() passToggle = false;

  textboxPassToggleIcon = 'eye';
  textboxPassToggled = false;

  constructor(public platformState: PlatformStateService) { }

  ngOnInit() { }

  onTogglePassword(): void {
    this.textboxPassToggled = !this.textboxPassToggled;
    this.textboxPassToggleIcon = (this.textboxPassToggled === true) ? 'eye-off' : 'eye';
    this.type = (this.textboxPassToggled === true) ? 'text' : 'password';
  }

  isInputInvalid(classes: string[]): boolean {
    const inputEle: HTMLInputElement = this.inputRef.nativeElement;
    return false && inputEle.value.length > 0;
  }
}
