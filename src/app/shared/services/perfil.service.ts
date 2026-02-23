// perfil.service.ts
import { Injectable } from '@angular/core';
import { UsersService } from '../../pages/admin/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  public isPerfil: boolean = true;
  public isChangePass: boolean = false;
  public isInviteFriends: boolean = false;
  public isReward: boolean = false;
  public isPay: boolean = false;
  public showRewards: boolean = false;
  public userName: string;
  public userId: number;
  rewards: any;
  totalRewards: number;

  constructor(private userSvc: UsersService,) { }

  getPaymentList(): void {
console.log('getPaymentList this.userName', this.userName)
    const body = {
      email: this.userName,
      userId: this.userId,
      month: ''
    };

    console.log('body de pagos hechos', body)

    this.userSvc.getPaymentData(body).subscribe((res) => {
      console.log('Update', body);
      console.log('res2', res);
      this.rewards = res;

      this.totalRewards = this.rewards.reduce((acumulador, actual) => acumulador + (Number(actual.cantidad) || 0), 0);
      console.log('this.totalRewards', this.totalRewards)
      
    }, (error) => {console.log('error', error)});
  }
}
