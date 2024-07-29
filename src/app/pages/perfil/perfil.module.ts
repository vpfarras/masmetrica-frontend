import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { RewardsComponent } from './rewards/rewards.component';
import { SharedModule } from '@shared/shared.module'; // Importa el SharedModule

@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [PerfilComponent, RecoveryPasswordComponent, RewardsComponent, InviteFriendsComponent]
})
export class PerfilModule { }
