import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { UsersService } from './../admin/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  token;
  dataLoaded: boolean = false;
  coinciden: boolean = true;
  constructor(public userForm: BaseFormUser,
    private route: ActivatedRoute,
    private userSvc: UsersService,
    private router: Router) { }

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
    this.coinciden = true;
    console.log('passForm',this.userForm.passwordForm)
    this.userForm.passwordForm.value.token = this.token;
    const formValue = this.userForm.passwordForm.value;
    console.log('formValue', formValue);
    if(formValue.newPassword === formValue.confirmNewPassword) {
      console.log('passwords iguales');
      this.userSvc.saveNewPassord(formValue).subscribe((res) => {
        console.log('Update', formValue);
        this.router.navigate(['/login']);
      });
    }else {
      this.coinciden = false;
      console.log('passwords diferentes');
    }
    /*this.userSvc.saveNewPassord(formValue).subscribe((res) => {
      console.log('Update', formValue);
    });*/
  }

}
