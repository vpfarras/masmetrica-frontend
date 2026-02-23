import { UtilsService } from './../../services/utils.service';
import { AuthService } from '@auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserResponse } from './../../models/user.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PerfilService } from './../../services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isAdmin = null;
  isLogged = false;
  isInit: boolean = false;
  isUser: boolean = false;
  private destroy$ = new Subject<any>();
  constructor(private authSvc: AuthService, 
    private utilsSvc: UtilsService, public perfil: PerfilService, private router: Router) {}

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isLogged = true;
        this.isAdmin = user?.role;
      });
  }

  onExit(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }

  closeSidebar(): void {
    this.utilsSvc.openSidebar(false);
  }

  setUsers(){
    this.isUser = true;
    this.isInit = false;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isInviteFriends = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
  }

  setInit(){
    this.isInit = true;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isInviteFriends = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.isUser = false;
  }

  goToMiPerfil(): void {
    this.perfil.isPerfil = true;
    this.perfil.isChangePass = false;
    this.perfil.isInviteFriends = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.isInit = false;
    this.isUser = false;
    this.closeSidebar();
    this.router.navigate(['/perfil']);
  }

  showInvitations() {
    this.perfil.isInviteFriends = true;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.isInit = false;
    this.isUser = false;
    this.closeSidebar();
    this.router.navigate(['/perfil']);
  }

  showChangePass() {
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = true;
    this.perfil.isInviteFriends = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.isInit = false;
    this.isUser = false;
    this.closeSidebar();
    this.router.navigate(['/perfil']);
  }
  
  showRewards() {
    this.perfil.getPaymentList();
    this.perfil.isInviteFriends = false;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isReward = true;
    this.perfil.isPay = false; 
    this.isInit = false;
    this.isUser = false;
    this.closeSidebar();
    this.router.navigate(['/perfil']);
  }

  showPays() {
    this.perfil.getPaymentList();
    this.perfil.isInviteFriends = false;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isReward = false;
    this.perfil.isPay = true;
    this.isInit = false;
    this.isUser = false;
    this.closeSidebar();
    this.router.navigate(['/perfil']);
  }
}
