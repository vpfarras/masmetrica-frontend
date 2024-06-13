// src/app/directives/auto-format-date.directive.ts
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAutoFormatDate]'
})
export class AutoFormatDateDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    let formatted = value.replace(/[^\d]/g, '');

    if (formatted.length > 1) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
    }
    if (formatted.length > 4) {
      formatted = `${formatted.slice(0, 5)}/${formatted.slice(5, 9)}`;
    }
    this.ngControl.control.setValue(formatted.slice(0, 10), { emitEvent: false });
  } 
}
