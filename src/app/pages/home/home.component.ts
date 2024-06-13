import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from './../admin/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from 'src/app/shared/components/info-modal/info-modal.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userData;
  private isEmpty;
  constructor(public authSvc: AuthService, 
    private router: Router,
    private userSvc: UsersService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('authSvc.user$', this.authSvc.userValue);
    this.userSvc.getActUser().subscribe((userData: any) => {
      console.log('users', userData);
      this.userData = userData;
      this.isEmpty = Object.values(this.userData).some(x => (x === ''));
      console.log('isEmpty', this.isEmpty)
      if(this.isEmpty) {
        this.onOpenModal();
      }
    });
    this.router.navigate(['/login']);
  }

  goToPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  goToUsers(): void {
    this.router.navigate(['/users']);
  }

  onOpenModal(): void {
    let dialogRef = this.dialog.open(InfoModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Perfil incompleto', 
      description: 'Para que podamos ofrecerte mas encuestas, por favor, completa tu perfil',
      irPerfil: 'Ir a mi perfil',
      method: 'goToPerfil',
      urlIrPerfil: '/perfil' }
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`, typeof result);
      if(result == 'goToPerfil') {
        console.log('ir a perfil');
        this.router.navigate(['/perfil']);
      }
    });
  }
}
