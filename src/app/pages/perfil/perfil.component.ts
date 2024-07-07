import { UsersService } from './../admin/services/users.service';
import { Component, Inject, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoModalComponent } from '../../shared/components/info-modal/info-modal.component'
import { BaseFormUser } from '@shared/utils/base-form-user';
import { MatDialog } from '@angular/material/dialog'
import { newPassword } from '../../shared/models/user.interface';
import { PerfilService } from '../../shared/services/perfil.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
  @ViewChild('inviteDialogTemplate') inviteDialogTemplate: TemplateRef<any>;
  @ViewChild('changePassDialogTemplate') changePassDialogTemplate: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;
  public userData;
  public dataLoaded: boolean = false;
  public isDisabled: boolean = true;
  public isPerfil: boolean = true;
  public isChangePass: boolean = false;
  public isInviteFriends: boolean = false;
  public isReward: boolean = false;
  public isPay: boolean = false;
  public modifyTxt = 'Editar';
  showPhoneCodeLab: boolean = false;
  public overlayTitle = 'Usuario modificado';
  public overlayDescription = 'Sus datos se han modificado correctamente';
  public titleTxt: string = 'Mi Perfil';
  public isChangePhone: boolean = false;
  userName: string;
  rewards: any;
  totalRewards: number;
  telefono: number;
  numeroHijos: number;
  constructor(
  public userForm: BaseFormUser,
  private dialog: MatDialog, 
  private userSvc: UsersService,  
  public perfil: PerfilService) { }


  
  ngOnInit() {
    this.userSvc.getActUser().subscribe((userData: any) => {
      this.userData = userData;
      this.dataLoaded = true;
      this.isDisabled = true;
      this.perfil.userName = userData.username;
      this.setFormData();
      this.numeroHijos = this.userData.numero_hijos;
    });
    if(this.perfil.showRewards) {
      this.perfil.getPaymentList();
      this.perfil.isInviteFriends = false;
      this.perfil.isPerfil = false;
      this.perfil.isChangePass = false;
      this.perfil.isReward = true;
      this.perfil.isPay = false;
    }
  }

  setFormData(): void {
    const fechaHijo1 = this.userData.fecha_nacimiento_hijo1 ?  
    this.formatearFecha(new Date(this.userData.fecha_nacimiento_hijo1)) : '';
    const fechaHijo2 = this.userData.fecha_nacimiento_hijo2 ?  
    this.formatearFecha(new Date(this.userData.fecha_nacimiento_hijo2)) : '';
    const fechaHijo3 = this.userData.fecha_nacimiento_hijo3 ?  
    this.formatearFecha(new Date(this.userData.fecha_nacimiento_hijo3)) : '';
    this.userForm.baseFormPatch.patchValue(
      {name: this.userData.name,
        apellido1: this.userData.apellido1,
        apellido2: this.userData.apellido2,
        apellidos: this.userData.apellidos,
        telefono: this.userData.telefono,
        municipio: this.userData.municipio,
        provincia: this.userData.provincia,
        codigo_postal: this.userData.codigo_postal,
        numero_hijos: this.userData.numero_hijos,
        sexo: this.userData.sexo,
        ingresos_mensuales: this.userData.ingresos_mensuales,
        ocupacion: this.userData.ocupacion,
        vive_con: this.userData.vive_con,
        nivel_estudios: this.userData.nivel_estudios,
        clase_social: this.userData.clase_social,
        fecha_nacimiento: this.formatearFecha(new Date(this.userData.fecha_nacimiento)),
        fecha_nacimiento_hijo1: fechaHijo1,
        fecha_nacimiento_hijo2: fechaHijo2,
        fecha_nacimiento_hijo3: fechaHijo3

      }
    )
  }

  formatearFecha(fecha): any {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses comienzan desde 0
    let anio = fecha.getFullYear();

    // Agregar cero delante del día y del mes si son menores de 10
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    return dia + '/' + mes + '/' + anio;
}

  checkField(field: string): boolean {
    return this.userForm.isValidField(field);
  }

  checkFieldPassword(field: string): boolean {
    return this.userForm.isValidPassword(field);
  }

  onSave(): void {
    //document.getElementById('capaInfo').style.display = 'block';
    const formValue = this.userForm.baseFormPatch.value;
    const edad = this.calculateAge(formValue.fecha_nacimiento);

    if (edad < 14) {
      alert('Debes tener más de 14 años.');
      return;
    }
    this.userSvc.updateActUser(formValue).subscribe((res) => {
      this.openOnChangeModal();
      this.modifyTxt = 'Editar'
      this.isDisabled = true;
    });
  }

  calculateAge(fechaNacimiento: string): number {
    const [day, month, year] = fechaNacimiento.split('/');
    const birthDate = new Date(+year, +month - 1, +day);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  onSelectionChange(event: any): void {
    this.numeroHijos = event.value;
    console.log('Número de hijos seleccionados:', this.numeroHijos);
  }

  requestPhoneCode() {
    this.userForm.tokenForm.value.resetToken = this.userForm.baseFormPatchTelefono.value;
    this.telefono = this.userForm.baseFormPatchTelefono.value.telefono;
    const formValue = this.userForm.tokenForm.value;
    this.userSvc.sendPhoneCode(formValue).subscribe((res) => {
      this.showPhoneCode();
    })
  }

  showPhoneCode(): void {
    this.showPhoneCodeLab = !this.showPhoneCodeLab;
  }

  validateSmsCode() {
   this.userForm.validateCodeForm.value.msisdn = this.telefono;
    const formValue = this.userForm.validateCodeForm.value;
    this.userSvc.validatePhoneCode(formValue).subscribe((res) => {
      if(res['result'].verified) {
        this.onSavePhone();
      }
    })
   // this.userForm.validateCodeForm.value.msisdn = this.telefono;
   // this.userForm.validateCodeForm.value.pin = this.telefono;
  }
 /* validateSmsCode() {
    console.log('entra en sedSMSCode');
    this.userForm.validateCodeForm.value.msisdn = this.telefono;
    const formValue = this.userForm.validateCodeForm.value;
    console.log(formValue);
    this.userSvc.validatePhoneCode(formValue).subscribe((res) => {
      console.log('validatePhoneCode res', res['result'].verified);
      if(res['result'].verified) {
        this.onSavePhone();
      }
    })
   // this.userForm.validateCodeForm.value.msisdn = this.telefono;
   // this.userForm.validateCodeForm.value.pin = this.telefono;
  }*/

  onSavePhone(){
    const formValue = this.userForm.baseFormPatchTelefono.value;
    this.userSvc.updateActUserPhone(formValue).subscribe((res) => {
      this.openOnChangeModal();
      this.modifyTxt = 'Editar'
      this.isDisabled = true;
      this.changePhone();
    });
  }

  changePhone(): void {
    this.isChangePhone = !this.isChangePhone;
  }
  savePassword(): void {
    const formValue = this.userForm.passwordForm.value;
    if(formValue.newPassword !== formValue.confirmNewPassword) {
      alert('la contraseña y la confirmación no coinciden');
    }
    else {
      this.userSvc.updatePassword(formValue).subscribe((res) => {
        console.log('Update', formValue);
        this.dialog.open(this.changePassDialogTemplate);
      });
    }
    
  }

 

  coments: string;
  friendIds: string[] = [];

  invitarAmigos(): void {
    const url = 'http://localhost:3000/invitar';
    const body = {
      coments: this.coments,
      friendIds: this.friendIds.slice(0, 5) // Limitar a 5 amigos
    };
    this.userSvc.inviteFriends(body).subscribe((res) => {
      console.log('Update', body);
      console.log('res', res);
      this.dialog.open(this.inviteDialogTemplate);
    }, (error) => {console.log('error', error)});

    /*this.http.post(url, body).subscribe(
      () => {
        console.log('Invitaciones enviadas correctamente');
        // Restablecer los campos del formulario
        this.userId = null;
        this.friendIds = [];
      },
      (error) => {
        console.error('Error al enviar invitaciones:', error);
      }
    ); */
  }



  enableForm(): void {
    this.isDisabled = !this.isDisabled;
    this.isDisabled ? (this.modifyTxt = 'Editar', this.setFormData()) : this.modifyTxt = 'Cancelar'
  }

  deleteUser(): void {
    this.userSvc.deleteUser().subscribe((res) => {
      console.log('delete', res);
    });
  }

  openOnChangeModal() {
    this.dialog.open(this.dialogTemplate);
  }

  onOpenModal(): void {
    let dialogRef = this.dialog.open(InfoModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: true,
      data: { title: this.overlayTitle, irPerfil:'Cerrar', method:'borrar', description: this.overlayDescription },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'borrar') {
        this.deleteUser();
      }
    });
  }

  showChangePass() {
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = true;
    this.perfil.isInviteFriends = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.titleTxt = 'Cambiar contraseña'
  }

  showPerfil() {
    this.perfil.isPerfil = true;
    this.perfil.isChangePass = false;
    this.perfil.isInviteFriends = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.titleTxt = 'Mi perfil'
  }

  showInvitations() {
    this.perfil.isInviteFriends = true;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isReward = false;
    this.perfil.isPay = false;
    this.titleTxt = 'Invitar a amigos'
  }

  showRewards() {
    this.perfil.getPaymentList();
    this.perfil.isInviteFriends = false;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isReward = true;
    this.perfil.isPay = false;
    this.titleTxt = 'Mis recompensas'
  }

  showPays() {
    this.perfil.getPaymentList();
    this.perfil.isInviteFriends = false;
    this.perfil.isPerfil = false;
    this.perfil.isChangePass = false;
    this.perfil.isReward = false;
    this.perfil.isPay = true;
    this.titleTxt = 'Actualizar pagos'
  }

  selectedFile: File | null = null;



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {    

    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.userSvc.uploadFile(formData).subscribe((res) => {
        console.log('Update', formData);
      });
    }
  }

  onDownload(): void {
    const formData: FormData = new FormData();
      formData.append('filename', 'ExcelSheet.xlsx');
      this.userSvc.downloadFile(formData).subscribe((res) => {
        console.log('Donwload', formData);
      });
  }

  getPaymentList(): void {

    const body = {
      email: this.perfil.userName,
      month: ''
    };

    this.userSvc.getPaymentData(body).subscribe((res) => {
      this.perfil.rewards = res;

      this.totalRewards = this.perfil.rewards.reduce((acumulador, actual) => acumulador + actual.Dinero, 0);

      
    }, (error) => {console.log('error', error)});
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '250px',
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      // Puedes manejar el resultado aquí si es necesario
    });
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
 
}
