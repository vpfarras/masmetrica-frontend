import { UsersService } from './../../admin/services/users.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { RegisterService } from './register.service';
import { PolicyModalComponent } from '@shared/components/policy-modal/policy-modal.component';

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
  showForm = true;
  showErrorMessage = false;
  showOkMessage = false;
  hide = true;
  params: any;
  opciones: string[] = [];
  opcionesFiltradas: Observable<string[]>;
  public miControl: FormControl;

  constructor(
    public userForm: BaseFormUser,
    private userSvc: UsersService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    public registerService: RegisterService  
  ) {}

  ngOnInit(): void {
    this.miControl = new FormControl('', [this.valorPermitidoValidator(this.opciones)]);
    const urlTree = this.router.parseUrl(this.router.url);
    this.params = urlTree.queryParams;

    this.opcionesFiltradas = this.miControl.valueChanges.pipe(
      startWith(''),
      map(valor => this._filtrar(valor as string))
    );
  }

  private valorPermitidoValidator(opcionesPermitidas: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
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
      this.setFormParams();
    }

    const formValue = this.userForm.baseFormRegister.value;
    const edad = this.calculateAge(formValue.fecha_nacimiento);

    if (edad < 14) {
      alert('Debes tener más de 14 años.');
      return;
    }
    
    this.userSvc.register(formValue).subscribe(
      data => {
        this.sendEmail();
      }, error => {
        console.log('se ha producido un error');
      });
  }

  checkField(field: string): boolean {
    return this.userForm.isValidRegister(field);
  }

  setFormParams(): void {
    this.userForm.baseFormRegister.value.params = this.params;
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    return throwError(errorMessage);
  }

  sendEmail() {
    const formValue = this.userForm.baseFormRegister.value;
    this.userSvc.sendEmailConfirmUser(formValue).subscribe(
      res => {
        this.showForm = false;
        this.showErrorMessage = false;
        this.showOkMessage = true;
      },
      error => {
        this.showForm = false;
        this.showErrorMessage = true;
        this.showOkMessage = false;
      }
    );
  }
  
  calculateAge(fechaNacimiento: string): number {
    const [day, month, year] = fechaNacimiento.split('/');
    const birthDate = new Date(+year, +month - 1, +day);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  openPolicyModal(title: string, content: string): void {
    this.dialog.open(PolicyModalComponent, {
      data: {
        title,
        content
      }
    });
  }
}
