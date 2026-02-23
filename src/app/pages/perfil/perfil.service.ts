// perfil.service.ts
import { Injectable } from '@angular/core';
import { UsersService } from './../admin/services/users.service';


export class PerfilService {
  public isPerfil: boolean = true;
  public isChangePass: boolean = false;
  public isInviteFriends: boolean = false;
  public isReward: boolean = false;
  public isPay: boolean = false;
  public userName: string;
  public userId: number;
  

  constructor(private userSvc: UsersService,) { }

  getPaymentList(): void {

    const body = {
      email: this.userName,
      userid: this.userId,
      month: ''
    };

    console.log('body de pagos hechos', body)

    this.userSvc.getPaymentData(body).subscribe((res) => {
      console.log('Update', body);
      console.log('resss', res);
      

      
    }, (error) => {console.log('error', error)});
  }
}
