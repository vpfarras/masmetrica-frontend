import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
codigos_postales: string[] = ['1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010', '1012', '1013', '1015', /* otros códigos postales */];
constructor() { }

}
