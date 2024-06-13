import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegisterLandingComponent } from './register-landing/register-landing.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'register-landing/:token', component: RegisterLandingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
