import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;
  private lettersAndSpaceOnly = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
  private zipCode = '^(?:0[1-9]|[1-4]\\d|5[0-2])\\d{3}$';
  private numberOnly = '^[0-9]*$';
  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseFormLogin = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
  
  baseFormRegister = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(5)]],
    phone: ['', [Validators.required, Validators.minLength(5)]],
    name: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    sexo: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly )],
    ],
    codigo_postal: [
      '',
      [, Validators.pattern(this.zipCode)],
    ],
    apellidos: [
      '',
      [, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    fecha_nacimiento: ['', [Validators.required, Validators.minLength(5)]],
    params: []
  });

  baseFormQuery = this.fb.group({
    formQuery: [
      'userRepository.createQueryBuilder("user").where("user.name = :name", { name: "Vicente" }).andWhere("user.username = :id", { id: "user@test.com" }).getMany()',
      [Validators.required],
    ]
  });

  baseForm = this.fb.group({
    username: [
      '',
      [, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(5)]],
    name: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    apellido1: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    apellido2: [
      '',
      [, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    codigo_postal: [
      '',
      [, Validators.pattern(this.zipCode)],
    ],
    ingresos_mensuales: [
      '',
      [, Validators.pattern(this.numberOnly)],
    ],
    municipio: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    provincia: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    numero_hijos: [
      '',
      [, Validators.pattern(this.numberOnly)],
    ],
    telefono: [
      '',
      [, Validators.pattern(this.numberOnly)],
    ],
    sexo: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly )],
    ],
    apellidos: [
      '',
      [, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    fecha_nacimiento: ['', [Validators.required, Validators.minLength(5)]],
    role: [''],
  });

  baseFormPatchTelefono = this.fb.group({    
    telefono: [
      '',
      [, Validators.pattern(this.numberOnly)],
    ],
  })

  baseFormPatch = this.fb.group({
    username: [
      '',
      [, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(5)]],
    name: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    apellido1: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    apellido2: [
      '',
      [, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    codigo_postal: [
      '',
      [, Validators.pattern(this.zipCode)],
    ],
    ingresos_mensuales: [
      '',
      [, Validators.pattern(this.numberOnly)],
    ],
    municipio: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    provincia: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    numero_hijos: [
      '',
      [, Validators.pattern(this.numberOnly)],
    ],
    sexo: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly )],
    ],
    apellidos: [
      '',
      [, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    fecha_nacimiento: ['', [Validators.required, Validators.minLength(5)]],
    role: [''],
  });

  baseFormModif = this.fb.group({
    username: [
      '',
      [, Validators.pattern(this.isValidEmail)],
    ],
    name: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    apellido1: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    apellido2: [
      '',
      [, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    codigo_postal: [
      '',
      [, Validators.pattern(this.zipCode)],
    ],
    ingresos_mensuales: [
      '',
      [, Validators.pattern(this.numberOnly)],
    ],
    municipio: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    provincia: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly)],
    ],
    numero_hijos: [
      '',
      [, Validators.pattern(this.numberOnly)],
    ],
    sexo: [
      '',
      [Validators.required, Validators.pattern(this.lettersAndSpaceOnly )],
    ],
    role: [''],
  });

  passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    newPassword: ['', [Validators.required, Validators.minLength(5)]],
    confirmNewPassword: ['', [Validators.required, Validators.minLength(5)]],
    token: ['', [Validators.required, Validators.minLength(5)]]
  })

  tokenForm = this.fb.group({
    resetToken: ['', [Validators.required, Validators.minLength(5)]]
  })

  validateCodeForm = this.fb.group({
    msisdn: ['', [Validators.required, Validators.pattern(this.numberOnly), Validators.minLength(5)]],
    pin: ['', [Validators.required, Validators.pattern(this.numberOnly), Validators.minLength(4)]],
  })

  recoveryPasswordForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ] 
  })

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  isValidLogin(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormLogin.get(field).touched || this.baseFormLogin.get(field).dirty) &&
      !this.baseFormLogin.get(field).valid
    );
  }

  isValidRegister(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormRegister.get(field).touched || this.baseFormRegister.get(field).dirty) &&
      !this.baseFormRegister.get(field).valid
    );
  }

  isValidPassword(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.passwordForm.get(field).touched || this.passwordForm.get(field).dirty) &&
      !this.passwordForm.get(field).valid
    );
  }

  isValidRecoveryPassword(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.recoveryPasswordForm.get(field).touched || this.recoveryPasswordForm.get(field).dirty) &&
      !this.recoveryPasswordForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm?.get(field) ?? this.baseFormLogin?.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'You must enter a value.',
        pattern: 'Not a valid email.',
        minlength: `This field must be longer than ${minlenght} characters`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
