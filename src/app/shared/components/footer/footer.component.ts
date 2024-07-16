import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PolicyModalComponent } from '@shared/components/policy-modal/policy-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
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
