import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { UsersService } from './../admin/services/users.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  token;
  dataLoaded: boolean = false;
  constructor(public userForm: BaseFormUser,
    private route: ActivatedRoute,
    private userSvc: UsersService) { }

  ngOnInit() {
    this.route.params.subscribe(par => {
      this.token = par.token;
      this.dataLoaded = true;
      console.log(this.token)
    })
  }

  checkFieldPassword(field: string): boolean {
    return this.userForm.isValidPassword(field);
  }

  savePassword(): void {
    console.log('passForm',this.userForm.passwordForm)
    this.userForm.passwordForm.value.token = this.token;
    const formValue = this.userForm.passwordForm.value;
    console.log('formValue', formValue);
    this.userSvc.saveNewPassord(formValue).subscribe((res) => {
      console.log('Update', formValue);
    });
  }

}
