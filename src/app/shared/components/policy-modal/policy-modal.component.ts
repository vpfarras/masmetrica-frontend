import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-policy-modal',
  templateUrl: './policy-modal.component.html',
  styleUrls: ['./policy-modal.component.scss']
})
export class PolicyModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PolicyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
