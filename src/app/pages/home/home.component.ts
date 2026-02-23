import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from './../admin/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from 'src/app/shared/components/info-modal/info-modal.component';
import { PerfilService } from './../../shared/services/perfil.service';
import { PolicyModalComponent } from '@shared/components/policy-modal/policy-modal.component';

type HomeAction = {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
  variant?: 'primary' | 'neutral';
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userData: any;
  private isEmpty: boolean;

  public actions: HomeAction[] = [];

  constructor(
    public authSvc: AuthService,
    private router: Router,
    private userSvc: UsersService,
    private dialog: MatDialog,
    private perfil: PerfilService
  ) {}

  ngOnInit(): void {
    this.userSvc.getActUser().subscribe((userData: any) => {
      this.userData = userData;

      this.isEmpty = Object.keys(this.userData).some((key) => {
        return (
          this.userData[key] === '' &&
          ![
            'apellido1',
            'apellido2',
            'fecha_nacimiento_hijo1',
            'fecha_nacimiento_hijo2',
            'fecha_nacimiento_hijo3',
          ].includes(key)
        );
      });

      if (this.isEmpty) this.onOpenModal();

      // Definimos aquí para poder usar los handlers sin líos de "this"
      this.actions = [
        {
          icon: 'admin_panel_settings',
          title: 'Mi perfil',
          desc: 'Completa y actualiza tus datos para recibir más encuestas.',
          onClick: () => this.goToMiPerfil(),
          variant: 'primary',
        },
        {
          icon: 'supervisor_account',
          title: 'Invitar amigos',
          desc: 'Comparte el panel y ayúdales a unirse fácilmente.',
          onClick: () => this.showInvitations(),
        },
        {
          icon: 'key',
          title: 'Cambiar contraseña',
          desc: 'Mejora tu seguridad en un minuto.',
          onClick: () => this.showChangePass(),
        },
        {
          icon: 'payments',
          title: 'Recompensas',
          desc: 'Consulta pagos realizados y próximos importes.',
          onClick: () => this.showRewards(),
        },
        {
          icon: 'flag',
          title: 'Privacidad',
          desc: 'Consulta nuestra política de privacidad.',
          onClick: () => this.openPolicyModal('Política de Privacidad', 'privacidad'),
        },
        {
          icon: 'gavel',
          title: 'Condiciones',
          desc: 'Consulta nuestras condiciones generales.',
          onClick: () => this.openPolicyModal('Condiciones Generales', 'generales'),
        },
      ];
    });

    this.router.navigate(['']);
  }

  goToPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  goToUsers(): void {
    this.router.navigate(['/users']);
  }

  goToMiPerfil(): void {
    this.perfil.isPerfil = true;
    this.perfil.isChangePass = false;
    this.perfil.isInviteFriends = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.router.navigate(['/perfil']);
  }

  showInvitations(): void {
    this.perfil.isInviteFriends = true;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.router.navigate(['/perfil']);
  }

  showChangePass(): void {
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = true;
    this.perfil.isInviteFriends = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.router.navigate(['/perfil']);
  }

  showRewards(): void {
    this.perfil.getPaymentList();
    this.perfil.isInviteFriends = false;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isReward = true;
    this.perfil.isPay = false;
    this.router.navigate(['/perfil']);
  }

  onOpenModal(): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {
        title: 'Perfil incompleto',
        description: 'Para que podamos ofrecerte más encuestas, por favor, completa tu perfil',
        irPerfil: 'Ir a mi perfil',
        method: 'goToPerfil',
        urlIrPerfil: '/perfil',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'goToPerfil') this.router.navigate(['/perfil']);
    });
  }

  openPolicyModal(title: string, content: string): void {
    this.dialog.open(PolicyModalComponent, {
      data: { title, content },
    });
  }

  buildWhatsappInviteLink(userId: string | number): string {
    const msg =
      'Te envío esta invitación para unirte a MasMétrica, empresa de estudios de mercado que te pagará por las encuestas que rellenes. ' +
      'Únete en el siguiente enlace: https://masmetrica.es/login/register?source=WhatsApp&user=' + userId;

    return 'https://wa.me/?text=' + encodeURIComponent(msg);
  }
}
