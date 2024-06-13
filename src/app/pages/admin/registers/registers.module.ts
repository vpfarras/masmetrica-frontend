import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistersComponent } from './registers.component';
import { RegistersRoutingModule } from './registers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RegistersRoutingModule
  ],
  declarations: [RegistersComponent],
})
export class RegistersModule { }
