// Imports.
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
    selector: 'app-BorrarAlumno',
    templateUrl: './BorrarAlumno.component.html',
    styleUrls: ['./BorrarAlumno.component.css']
})

export class BorrarAlumnoComponent {

    // Variable donde se guardara el token de acceso.
    httpOptions: any;

    nombre = this.usuarios.getNombreAlumno();


    // Constructor.
    constructor(public dialogRef: MatDialogRef<BorrarAlumnoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.
    BorrarAlumno(): void {

        const id_alumno = {
            "id_usuario": this.usuarios.getIdAlumno(),
            "id_ranking": this.usuarios.getIdRanking()
        };

        console.log(id_alumno);

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        this._http.post(this.usuarios.URL + 'deleteuser', id_alumno, this.httpOptions).subscribe(() => {
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