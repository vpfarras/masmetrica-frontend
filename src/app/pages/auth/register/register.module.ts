import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';

import { RegisterLandingComponent } from './register-landing/register-landing.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {AutoFormatDateDirective} from '@shared/directives/auto-format-date.directive.ts.directive'
import {RegisterService} from './register.service'
@NgModule({
  declarations: [RegisterComponent, RegisterLandingComponent, AutoFormatDateDirective],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  
})

export class RegisterModule { }
