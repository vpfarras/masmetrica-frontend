import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterLandingComponent } from './register-landing/register-landing.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { AutoFormatDateDirective } from '@shared/directives/auto-format-date.directive.ts.directive';
import { RegisterService } from './register.service';
import { PolicyModalComponent } from '@shared/components/policy-modal/policy-modal.component'; // Importa el componente

@NgModule({
  declarations: [RegisterComponent, RegisterLandingComponent, AutoFormatDateDirective, PolicyModalComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule // Agrega MatDialogModule a los imports
  ],
  entryComponents: [PolicyModalComponent] // Agrega PolicyModalComponent a entryComponents
})
export class RegisterModule {}
