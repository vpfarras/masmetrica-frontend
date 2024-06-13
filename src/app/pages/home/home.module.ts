import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
