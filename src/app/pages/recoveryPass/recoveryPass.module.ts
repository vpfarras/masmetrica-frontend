import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoveryPassComponent } from './recoveryPass.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';

const routes: Routes = [
  {
    path: '',
    component: RecoveryPassComponent,
  },
];

@NgModule({
  declarations: [RecoveryPassComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
})
export class RecoveryPassModule {}
