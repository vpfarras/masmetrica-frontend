import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../admin/services/users.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  userName: string;
  rewards: any;
  totalRewards: number;
  constructor(private userSvc: UsersService) { }

  ngOnInit() {
    this.userSvc.getActUser().subscribe((userData: any) => {
      console.log('users', userData);
      this.userName = userData.username;
      this.getPaymentList()
    });
  }

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
