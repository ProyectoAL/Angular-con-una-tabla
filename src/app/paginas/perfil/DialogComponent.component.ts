import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

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

  httpOptions: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public usuarios: UsuariosService, private _http: HttpClient) { }


  onHomeClick() {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '')[1]}`
      })
    };

    this._http.get(this.usuarios.URL + 'logout', this.httpOptions).subscribe(() => {
      // Borrar el token de autenticación del usuario actual
      localStorage.removeItem('currentUser');
      // Redirigir al usuario a la página de inicio de sesión
      this.dialogRef.close('home');
    })
  }

  onBackClick(): void {
    this.dialogRef.close('back');
  }
}