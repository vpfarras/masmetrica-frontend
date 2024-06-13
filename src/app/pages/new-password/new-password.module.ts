import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './new-password.component';
import { NewPasswordRoutingModule } from './new-password-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NewPasswordComponent]
})
export class NewPasswordModule { }
