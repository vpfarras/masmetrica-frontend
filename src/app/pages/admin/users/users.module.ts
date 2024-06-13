import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDataListComponent } from './users-data-list/users-data-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, UsersDataListComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class UsersModule {}
