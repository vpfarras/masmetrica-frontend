import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User, newPassword, newQuery } from '@app/shared/models/user.interface';
import { saveAs } from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.API_URL}/users`)
      .pipe(catchError(this.handlerError));
  }

  getQuery(query: { formQuery: string }): Observable<User[]> {
    return this.http
      .post<User[]>(`${environment.API_URL}/actions/query`, query) // Enviar directamente
      .pipe(catchError(this.handlerError));
  }
  
  
  

  getById(userId: number): Observable<User> {
    return this.http
      .get<any>(`${environment.API_URL}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  getActUser(): Observable<User> {
    console.log('getActUser');
     return this.http
      .get<any>(`${environment.API_URL}/actions`)
      .pipe(catchError(this.handlerError)); 
      /*this.http.get<User>(`${environment.API_URL}/actions`).subscribe(
        data => {console.log('bieeen', data)})*/
  }

  new(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.API_URL}/users`, user)
      .pipe(catchError(this.handlerError));
  }

  register(user: User): Observable<any> {
    console.log('register user', user);
    const options = null;
      return this.http.post<User>(`${environment.API_URL}/actions/register`,user)
      .pipe(catchError(this.handlerError));
  }

  registerActiveUser(user: any): Observable<{ token: string }> {
    return this.http
      .put<{ token: string }>(`${environment.API_URL}/actions/registerActive`, user)
      .pipe(catchError(this.handlerError));
  }

  sendPhoneCode(user: any): Observable<{}> {
    console.log('entra en sendPhoneCode de user.service');
    console.log('user en sendPhoneCode de user.service', user);
    return this.http
      .post<{}>(`${environment.API_URL}/actions/requestSmsCode`, user)
      .pipe(catchError(this.handlerError));
  }

  validatePhoneCode(user: any): Observable<{ result: { verified: boolean } }> {
    console.log('entra en sendPhoneCode de user.service');
    console.log('user en sendPhoneCode de user.service', user);
    return this.http
      .post<{ result: { verified: boolean } }>(`${environment.API_URL}/actions/validateSmsCode`, user)
      .pipe(catchError(this.handlerError));
  }

  registerInvitation(user: any): Observable<{}> {
    return this.http
      .put<{}>(`${environment.API_URL}/actions/registerActive`, user)
      .pipe(catchError(this.handlerError));
  }

  update(userId: number, user: User): Observable<User> {
    return this.http
      .patch<User>(`${environment.API_URL}/users/${userId}`, user)
      .pipe(catchError(this.handlerError));
  }

  updateActUser(user: User): Observable<User> {
    console.log('updateActUser');
    return this.http
      .patch<User>(`${environment.API_URL}/actions`, user)
      .pipe(catchError(this.handlerError));
  }

  updateActUserPhone(user: User): Observable<User> {
    console.log('updateActUser');
    return this.http
      .patch<User>(`${environment.API_URL}/actions/modifPhone`, user)
      .pipe(catchError(this.handlerError));
  }

  updatePassword(user: newPassword) {
      console.log('user password', user)
      return this.http
      .post<newPassword>(`${environment.API_URL}/actions/changepassword`, user)
      .pipe(catchError(this.handlerError));
  }

  checkPassword(user: newPassword){
    console.log('password', user.password);
    return this.http
      .post<newPassword>(`${environment.API_URL}/actions/checkPassword`, user)
      .pipe(catchError(this.handlerError));
  }

  inviteFriends(friends: any) {
    console.log('user friends', friends)
    return this.http
    .post<newPassword>(`${environment.API_URL}/actions/invitation`, friends)
    .pipe(catchError(this.handlerError));
  }

  delete(userId: number): Observable<{}> {
    return this.http
      .delete<User>(`${environment.API_URL}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  deleteUser(): Observable<{}> {
    return this.http
      .delete<User>(`${environment.API_URL}/actions/delete`)
      .pipe(catchError(this.handlerError));
  }

  sendEmailRecoveryPassword(authData: User): Observable<{}> {
    console.log('authData', authData)
    return this.http
      .put<User>(`${environment.API_URL}/actions/forgot-password`, authData)
      .pipe(catchError(this.handlerError));
  }

  sendEmailConfirmUser(authData: User): Observable<{}> {
    console.log('authData2', authData)
    return this.http
      .put<User>(`${environment.API_URL}/actions/confirm-user`, authData)
      .pipe(catchError(this.handlerError));
  }

  saveNewPassord(user: newPassword) {
  console.log('user', user)
  return this.http
    .put<User>(`${environment.API_URL}/actions/new-password`, user)
    .pipe(catchError(this.handlerError));
  }

  uploadFile(formData: FormData) {
    console.log('formData file', formData.getAll('file'));
    return this.http
      .post<User>(`${environment.API_URL}/actions/uploadFile`, formData)
      .pipe(catchError(this.handlerError));
  }

  downloadFile(formData: FormData): any{
    console.log('formData file', formData.getAll('filename'));
    /*return this.http
      .get<any>(`${environment.API_URL}/actions/downloadFile/${formData.getAll('filename')}` )
      .pipe(catchError(this.handlerError)); */
      this.http.get(`${environment.API_URL}/actions/downloadFile/${formData.getAll('filename')}`, { responseType: 'blob' })
  .subscribe(response => {
    const filename = 'ExcelSheet.xlsx';
    saveAs(response, filename);
  });
  }

  getPaymentData(user: any): Observable<any> {
    console.log('getPaymentData user', user)
    return this.http
      .post<any>(`${environment.API_URL}/actions/getPaymentData`, user)
      .pipe(catchError(this.handlerError));
  }

  private handlerError(error: any): Observable<never> {
    let errorMessage = 'Error desconocido'; // Mensaje de error por defecto
    console.log('handlerError, objeto de error recibido:', error);
  
    // Verificamos si es un HttpErrorResponse y manejamos el error de manera segura
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error del cliente: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
        
        // Si el servidor envía un objeto con más detalles
        if (error.error && typeof error.error === 'object') {
          errorMessage = error.error.message || errorMessage; // Accede al mensaje de error si existe
        }
      }
    } else {
      // Manejar cualquier otro tipo de error (posiblemente no HTTP)
      errorMessage = `Error inesperado: ${error.message || 'Desconocido'}`;
    }
  
    console.log('Mensaje de error generado:', errorMessage);
    return throwError(errorMessage); // Retornamos el mensaje de error para que sea manejado
  }

  // Solicitar el cambio de email
  requestEmailChange(data: { newEmail: string }) {
    return this.http.post(`${environment.API_URL}/actions/request-email-change`, data);
  }

  // Verificar el código y cambiar el email
  verifyEmailCode(data: { newEmail: string, verificationCode: string }) {
    return this.http.post(`${environment.API_URL}/actions/verify-email-code`, data);
  }
  
}
