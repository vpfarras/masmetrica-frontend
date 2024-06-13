
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { RewardsComponent } from './rewards/rewards.component';

const routes: Routes = [
  { path: '', component: PerfilComponent },
  { path: 'recovery-password', component: RecoveryPasswordComponent },
  { path: 'rewards', component: RewardsComponent },
  {path: 'invite-friends', component: InviteFriendsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
