import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../admin/services/users.service';
import { BaseFormUser } from '@shared/utils/base-form-user';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  public dataLoaded: boolean = true;
  constructor(public userForm: BaseFormUser,  
    private userSvc: UsersService) { }

  ngOnInit() {
    this.dataLoaded = true;
  }

  checkFieldEmail(field: string): boolean {
    return this.userForm.isValidRecoveryPassword(field);
  }

  sendEmail(){
    const formValue = this.userForm.recoveryPasswordForm.value;
    this.userSvc.sendEmailRecoveryPassword(formValue).subscribe((res) => {
      console.log('delete', res);
    });
  }

}
