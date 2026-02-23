import { Component, OnInit } from '@angular/core';
import { UsersService } from './../admin/services/users.service';
import { BaseFormUser } from '../../shared/utils/base-form-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoveryPass',
  templateUrl: './recoveryPass.component.html',
  styleUrls: ['./recoveryPass.component.scss']
})
export class RecoveryPassComponent implements OnInit {

  public dataLoaded: boolean = true;
  isSending = false;
  constructor(public userForm: BaseFormUser,  
    private userSvc: UsersService,
  private router: Router,) { }

  ngOnInit() {
    this.dataLoaded = true;
  }

  checkFieldEmail(field: string): boolean {
    return this.userForm.isValidRecoveryPassword(field);
  }

  sendEmail(){
    const formValue = this.userForm.recoveryPasswordForm.value;
    this.userSvc.sendEmailRecoveryPassword(formValue).subscribe((res) => {
      this.isSending = true;
      console.log('delete', res);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
