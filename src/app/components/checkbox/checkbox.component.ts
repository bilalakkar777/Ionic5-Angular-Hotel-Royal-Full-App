import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { PlatformStateService } from 'src/app/services/platform-service/platform-service.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input('checkbox-parent-form-group') parentFormGroup: FormGroup;
  @Input('checkbox-parent-form-group-name') formControlName: FormControlName;
  @Input('checkbox-text') text: string = '';

  constructor(public platformState: PlatformStateService) { }

  ngOnInit() {
  }

}
