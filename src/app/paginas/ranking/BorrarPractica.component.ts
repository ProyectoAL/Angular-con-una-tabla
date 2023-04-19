// Imports.
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
    selector: 'app-BorrarPractica',
    templateUrl: './BorrarPractica.component.html',
    styleUrls: ['./BorrarPractica.component.css']
})

export class BorrarPracticaComponent {

    // Variable donde se guardara el token de acceso.
    httpOptions: any;

    id: any;

    nombre = this.usuarios.getNombrePractica();


    // Constructor.
    constructor(public dialogRef: MatDialogRef<BorrarPracticaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.
    BorrarPractica(): void {

        this.id = this.usuarios.getIdPractica();

        console.log(this.id);

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        this._http.post(this.usuarios.URL + `deletep/${this.id}`, this.id, this.httpOptions).subscribe(() => {
            // Redirigir al usuario a la página anterior
            this.dialogRef.close('back');
        })
    }

    // Funcion para cerrar la pestaña
    onBackClick(): void {

        // Para cerrar la pestaña
        this.dialogRef.close('back');
    }
}