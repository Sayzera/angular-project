import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-button',
  standalone: true,
  template: `<button [type]="type"><ng-content></ng-content></button>`
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
} 