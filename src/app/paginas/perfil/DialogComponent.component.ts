import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  template: `
    <h2 mat-dialog-title>Logout</h2>
    <div mat-dialog-content>
      <p>¿Quieres cerrar la sesión?</p>
    </div>
    <div mat-dialog-actions>
      <button id="Si" mat-button (click)="onHomeClick()">Si, cierra la sesión</button>
      <button id="No" mat-button (click)="onBackClick()">No, vuelve al perfil</button>
    </div>
  `,
  styleUrls: ['./DialogComponent.component.css']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onHomeClick(): void {
    this.dialogRef.close('home');
  }

  onBackClick(): void {
    this.dialogRef.close('back');
  }
}