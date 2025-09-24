import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  imports: [MatButtonModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss',
})
export class ConfirmDeleteComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
