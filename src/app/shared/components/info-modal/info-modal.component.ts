import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogClose} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {
  hasButton: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<InfoModalComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      console.log('data', this.data)
      if(this.data.irPerfil) {
        this.hasButton = true;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  irPerfil(): void {
    if(this.hasButton) {
      console.log('hasButton')
      this.router.navigate(['/perfil']);
      this.dialogRef.close();
    }
    
  }

  myMethod(val){ 
    this.dialogRef.close(val);
  }

}