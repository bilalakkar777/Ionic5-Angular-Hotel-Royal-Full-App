import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PlatformStateService } from 'src/app/services/platform-service/platform-service.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  @Input('button-text') text: string = 'Click me!';
  @Input('button-text-size') textSize: number = 16;
  @Input('button-text-color') textColor = '#000000';
  @Input('button-bg-left-color') bgLeftColor: string = '#FFFFFF';
  @Input('button-bg-right-color') bgRightColor: string = '#FFFFFF';

  @ViewChild('btn') btn: ElementRef;

  constructor(public platformState: PlatformStateService) { }

  ngOnInit() {
    const btnElement: HTMLInputElement = <HTMLInputElement>this.btn.nativeElement;

    btnElement.style.color = this.textColor;
    btnElement.style.fontSize = `${this.textSize}px`;
    btnElement.style.background = `linear-gradient(to right, ${this.bgLeftColor}, ${this.bgRightColor})`;
  }

  onClick(): void {
    this.clickEvent.emit();
  }
}
