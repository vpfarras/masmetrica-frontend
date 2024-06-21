
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoveryPassComponent } from './recoveryPass.component';

const routes: Routes = [
  { path: '', component: RecoveryPassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverPassRoutingModule { }
