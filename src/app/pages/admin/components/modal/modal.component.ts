import { UsersService } from './../../services/users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BaseFormUser } from '@shared/utils/base-form-user';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  action;
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUser,
    private userSvc: UsersService
  ) {}

  ngOnInit(): void {
    this.action = Action;
    console.log('userForm', this.userForm)
    console.log('onInit', this.data)
    if (this.data?.user.hasOwnProperty('id')) {
      console.log('this.data => ', this.data);
      this.actionTODO = Action.EDIT;
      this.showPasswordField = false;
      this.userForm.baseFormLogin.get('password').setValidators(null);
      this.userForm.baseFormLogin.updateValueAndValidity();
      this.data.title = 'Edit user';
      this.pathFormData();
    }
    console.log('Despues de if')
  }

  onSave(): void {
    let formValue = this.userForm.baseForm.value;
    console.log('fromValue', formValue);
    console.log('this.actionTODO',  this.actionTODO)
    if (this.actionTODO === Action.NEW) {
      console.log('entra en new')
      this.userSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
      });
    } else {
      formValue = this.userForm.baseFormModif.value;
      const userId = this.data?.user?.id;
      this.userSvc.update(userId, formValue).subscribe((res) => {
        console.log('Update', res);
      });
    }
  }

  checkField(field: string): boolean {
     return this.userForm.isValidField(field);
  }

  private pathFormData(): void {
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
      name: this.data?.user?.name,
        apellido1: this.data?.user?.apellido1,
        apellido2: this.data?.user?.apellido2,
        municipio: this.data?.user?.municipio,
        provincia: this.data?.user?.provincia,
        codigo_postal: this.data?.user?.codigo_postal,
        numero_hijos: this.data?.user?.numero_hijos,
        sexo: this.data?.user?.sexo,
        ingresos_mensuales: this.data?.user?.ingresos_mensuales,
    });
  }
}
