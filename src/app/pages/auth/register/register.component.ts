import { UsersService } from './../../admin/services/users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/shared/models/user.interface';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { Observable, throwError } from 'rxjs';
import { InfoModalComponent } from '../../../shared/components/info-modal/info-modal.component'
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {RegisterService} from './register.service'
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  actionTODO = Action.NEW;
  showPasswordField = true;
  showForm: boolean = true;
  showErrorMessage: boolean = false;
  showOkMessage: boolean = false;
  hide = true;
  params: any;
  opciones: string[] = [];
  opcionesFiltradas: Observable<string[]>;
  public miControl;
  constructor(
    //@Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUser,
    private userSvc: UsersService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,  
    public registerService: RegisterService  
  ) {}

  ngOnInit(): void {
    /* if (this.data?.user.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.showPasswordField = false;
      this.userForm.baseForm.get('password').setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit user';
      this.pathFormData();
    } */
    //this.opciones = this.registerService.codigos_postales;
    this.miControl = new FormControl('', [this.valorPermitidoValidator(this.opciones)]);;
    const urlTree = this.router.parseUrl(this.router.url);
    console.log('params = ', urlTree.queryParams);
    this.params = urlTree.queryParams;
    console.log('params length', this.params.user);
    this.opcionesFiltradas = this.miControl.valueChanges.pipe(
      startWith(''),
      map(valor => this._filtrar(valor as string))
    );
  }

  // Función para crear el validador personalizado
private valorPermitidoValidator(opcionesPermitidas: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valorEsPermitido = opcionesPermitidas.includes(control.value);
    return valorEsPermitido ? null : { valorNoPermitido: { value: control.value } };
  };
}

  private _filtrar(valor: string): string[] {
    const filtroValor = valor.toLowerCase();

    return this.opciones.filter(opcion => opcion.toLowerCase().includes(filtroValor));
  }
  
  onSave(): any {
    if (this.params.user && this.params.friend) {
      this.setFormParams()
    }
    const formValue = this.userForm.baseFormRegister.value;
    console.log('formValue', formValue);
    const edad = this.calculateAge(formValue.fecha_nacimiento);

    if (edad < 14) {
      alert('Debes tener más de 14 años.');
      return;
    }
    
    this.userSvc.register(formValue).subscribe(
      data => {
        console.log('dataaaaaa', data);
       // this.onOpenModal();
       this.sendEmail()
      }, error => {
        console.log('se ha producido un error');
      });
    /*this.http.post<any>('http://localhost:3000/users/register', formValue).subscribe(
      data => {console.log('bieeen', data)})*/
    
  }

  checkField(field: string): boolean {
    return this.userForm.isValidRegister(field);
  }

  /* private pathFormData(): void {
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
    });
  } */

  setFormParams(): void {
    console.log('setformparams');
    this.userForm.baseFormRegister.value.params = this.params;

  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  onOpenModal(): void {
    let dialogRef = this.dialog.open(InfoModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Usuario cread', description: 'Para finalizar el proceso de alta consulta tu email y sigue las instrucciones' },
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.router.navigate(['/register/register-landing']);
      this.sendEmail()
      console.log(`Dialog result: ${result}`, typeof result);
    });
  }

  sendEmail(){
    const formValue = this.userForm.baseFormRegister.value;
    
    this.userSvc.sendEmailConfirmUser(formValue).subscribe((res) => {
      this.showForm = false;
      this.showErrorMessage = false;
      this.showOkMessage = true;
    }, error => {
      this.showForm = false;
      this.showErrorMessage = true;
      this.showOkMessage = false;
    });
  };
  
  calculateAge(fechaNacimiento: string): number {
    const [day, month, year] = fechaNacimiento.split('/');
    const birthDate = new Date(+year, +month - 1, +day);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
