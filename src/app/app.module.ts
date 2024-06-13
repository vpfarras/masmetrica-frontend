import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MaterialModule } from '@app/material.module';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminInterceptor } from '@shared/interceptors/admin-interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
