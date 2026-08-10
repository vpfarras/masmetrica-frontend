import { UsersService } from './../../admin/services/users.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { RegisterService } from './register.service';
import { PolicyModalComponent } from '@shared/components/policy-modal/policy-modal.component';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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
  paramOrigin = null;
  mensajeError: string = '';
  @ViewChild('errorRegister') errorRegister: TemplateRef<any>;
  
  dialogRef: MatDialogRef<any>;

  constructor(
    public userForm: BaseFormUser,
    private userSvc: UsersService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    public registerService: RegisterService,
    private route: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    this.miControl = new FormControl('', [this.valorPermitidoValidator(this.opciones)]);

    // 1. Intentamos leer los params directamente del Router de Angular
    const urlTree = this.router.parseUrl(this.router.url);
    let currentParams = urlTree.queryParams;
    console.log('params', currentParams);

    // 2. Recuperamos los parámetros respaldados en LocalStorage (guardados por index.html)
    const savedParams = JSON.parse(localStorage.getItem('url_params') || '{}');

    // 3. Fusionamos: si Angular perdió la URL, prevalecen los datos de LocalStorage
    this.params = { ...savedParams, ...currentParams };
    console.log('Params finales capturados para el registro:', this.params);

    this.opcionesFiltradas = this.miControl.valueChanges.pipe(
      startWith(''),
      map(valor => this._filtrar(valor as string))
    );

    this.route.queryParams.subscribe(queryParams => {
      const page = queryParams['origin'];
      if (page) {this.paramOrigin = page}
    });
    console.log('this.paramOrigin', this.paramOrigin)
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
  // 1. Leemos el origen guardado en LocalStorage por el script del index.html
  const savedSource = localStorage.getItem('user_source');

  // 2. Si existe un source guardado, lo metemos en this.params de forma explícita
  if (savedSource) {
    this.params = {
      ...this.params,
      source: savedSource
    };
  }

  // Si había parámetros de usuario/amigo, mantenemos tu lógica
  if (this.params.user && this.params.friend) {
    this.setFormParams();
  }

  // 3. Extraemos el formulario y le asignamos this.params ya rellenado
  const formValue = this.userForm.baseFormRegister.value;
  formValue.params = this.params;

  console.log('Payload final enviado al backend:', formValue);

  const edad = this.calculateAge(formValue.fecha_nacimiento);

  if (edad < 14) {
    alert('Debes tener más de 14 años.');
    return;
  }
  
  // 4. Enviamos el registro
  this.userSvc.register(formValue).subscribe(
    data => {
      this.sendEmail();
    }, 
    error => {
      if (error instanceof Error) {
        console.error('Error capturado:', error.message);
      } else if (error instanceof HttpErrorResponse) {
        if (error.error) {
          console.log('Error HTTP capturado:', error);
        } else {
          console.log(`Error estado ${error.status}: ${error.statusText}`);
        }
      } else {
        console.log('Error inesperado:', error);
        this.mensajeError = error;
        this.dialog.open(this.errorRegister);
      }
    }
  );
}

  checkField(field: string): boolean {
    return this.userForm.isValidRegister(field);
  }

  setFormParams(): void {
    this.userForm.baseFormRegister.value.params = this.params;
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    console.log('etra en hadleerError')
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
