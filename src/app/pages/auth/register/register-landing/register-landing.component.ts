import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './../../../admin/services/users.service';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-landing',
  templateUrl: './register-landing.component.html',
  styleUrls: ['./register-landing.component.scss']
})
export class RegisterLandingComponent implements OnInit {
  token;
  dataLoaded: boolean = false;
  title: string = 'Crendo usuario';
  firstP: string = 'Estamos generando tu usario';
  secondP: string = '';
  friend: string = '';
  user: string = '';
  telefono: number = null;

  constructor(private route: ActivatedRoute, 
    public userForm: BaseFormUser,
    private userSvc: UsersService,
    private router: Router) { }

  ngOnInit() {
    console.log('this.route.params', this.route.queryParams  )
    this.route.queryParams.subscribe(par => {
      this.friend = par.friend;
      this.user = par.user;
      this.telefono = par.phone;
    })
    this.route.params.subscribe(par => {
      this.token = par.token;
      this.dataLoaded = true;
      console.log(par);
      this.sendPhoneCode()
      // this.saveUser();
    })
    this.route.queryParams.subscribe(par => {
      this.friend = par.friend;
      this.user = par.user;
    })
    console.log('friend user', this.friend + this.user)
  }

  sendPhoneCode() {
    console.log('entra en sendPhoneCode');
    this.userForm.tokenForm.value.resetToken = this.telefono;
    const formValue = this.userForm.tokenForm.value;
    console.log('sendPhoneCode formValue = ',formValue);
    this.userSvc.sendPhoneCode(formValue).subscribe((res) => {
      console.log('sendPhoneCode res', res)
    })
  }

  validateSmsCode() {
    console.log('entra en sedSMSCode');
    this.userForm.validateCodeForm.value.msisdn = this.telefono;
    const formValue = this.userForm.validateCodeForm.value;
    console.log(formValue);
    this.userSvc.validatePhoneCode(formValue).subscribe((res) => {
      console.log('validatePhoneCode res', res['result'].verified);
      if(res['result'].verified) {
        this.saveUser();
      }
    })
   // this.userForm.validateCodeForm.value.msisdn = this.telefono;
   // this.userForm.validateCodeForm.value.pin = this.telefono;
  }

  saveUser(): void {
    this.userForm.tokenForm.value.resetToken = this.token;
    const formValue = this.userForm.tokenForm.value;
    console.log('formValue', formValue);
    console.log('userForm', this.userForm);
    this.userSvc.registerActiveUser(formValue).subscribe((res) => {
      if (this.user && this.friend){
        console.log('hay parametros', this.friend + this.user);
        this.userSvc.registerInvitation(formValue).subscribe((res) => {
          this.setPageContent()
          console.log('Update');
          this.goToLogin();
        });
      }
      else {
        console.log('no hay parametros')
        this.setPageContent()
          console.log('Update', res); 
          this.goToLogin();
      }
      
    });
  }

  setPageContent(): void {
    this.title = 'Proceso de alta finalizado';
    this.firstP = '¡¡¡Enhorabuena, ya eres uno de los nuestros!!!';
    this.secondP = 'Accede con tus credenciales y descubre las posibilidades que te brinda sociológica'
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
