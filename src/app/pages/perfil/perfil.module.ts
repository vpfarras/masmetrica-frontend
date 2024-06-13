import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { RewardsComponent } from './rewards/rewards.component';

@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [PerfilComponent, RecoveryPasswordComponent, RewardsComponent, InviteFriendsComponent]
})
export class PerfilModule { }
