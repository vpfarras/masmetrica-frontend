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
  rewards: any;
  totalRewards: number;

  constructor(private userSvc: UsersService,) { }

  getPaymentList(): void {

    const body = {
      email: this.userName,
      month: ''
    };

    console.log('body de pagos hechos', body)

    this.userSvc.getPaymentData(body).subscribe((res) => {
      console.log('Update', body);
      console.log('res', res);
      this.rewards = res;

      this.totalRewards = this.rewards.reduce((acumulador, actual) => acumulador + actual.Dinero, 0);

      
    }, (error) => {console.log('error', error)});
  }
}
