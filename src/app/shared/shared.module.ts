// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFormatDateDirective } from './directives/auto-format-date.directive.ts.directive';

@NgModule({
  declarations: [AutoFormatDateDirective],
  imports: [CommonModule],
  exports: [AutoFormatDateDirective] // Asegúrate de exportarla
})
export class SharedModule { }
