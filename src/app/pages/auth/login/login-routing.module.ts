import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecoveryPasswordComponent } from '../../perfil/recovery-password/recovery-password.component';
import { LoginComponent } from './login.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'perfil/recovery-password', component: RecoveryPasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
