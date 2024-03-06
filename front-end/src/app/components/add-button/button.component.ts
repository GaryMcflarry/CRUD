// importing commands to be used
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text!: string;
  
  [x: string]: any;
// when clicking button it must make event (Opening the form up to add a client)
  @Output() btnClick = new EventEmitter();

  onClick() {
  this.btnClick.emit();
  }

  
}
