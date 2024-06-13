import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User, newPassword, newQuery } from '@app/shared/models/user.interface';
import { saveAs } from 'file-saver';

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

  getQuery(user): Observable<User[]> {
    console.log('user', user.formQuery)
    return this.http
      .get<any>(`${environment.API_URL}/actions/query/${user.formQuery}`)
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
      return this.http.post<User>(`${environment.API_URL}/actions/register`,user, { ...options, responseType: 'text' }  )
      .pipe(catchError(this.handlerError));
  }

  registerActiveUser(user: any): Observable<{}> {
    return this.http
    .put<User>(`${environment.API_URL}/actions/registerActive`, user)
    .pipe(catchError(this.handlerError));
  }

  sendPhoneCode(user: any): Observable<{}> {
    console.log('entra en sendPhoneCode de user.service');
    console.log('user en sendPhoneCode de user.service', user);
    return this.http
    .post<any>(`${environment.API_URL}/actions/requestSmsCode`, user)
    .pipe(catchError(this.handlerError));
    console.log('fin sendPhoneCide de user.service')
  }

  validatePhoneCode(user: any): Observable<{}> {
    console.log('entra en sendPhoneCode de user.service');
    console.log('user en sendPhoneCode de user.service', user);
    return this.http
    .post<any>(`${environment.API_URL}/actions/validateSmsCode`, user)
    .pipe(catchError(this.handlerError));
    console.log('fin sendPhoneCide de user.service')
  }

  registerInvitation(user: any): Observable<{}> {
    return this.http
    .put<User>(`${environment.API_URL}/actions/registerActive`, user)
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

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    console.log('handlerError', error)
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    console.log('antes de alert', errorMessage)
    alert(error.error.message);
    return throwError(errorMessage);
  }
}
