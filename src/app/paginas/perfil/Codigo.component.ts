// Imports.
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
    selector: 'app-Codigo',
    templateUrl: './Codigo.component.html',
    styleUrls: ['./Codigo.component.css']
})

export class CodigoComponent {

    // Variable donde se guardara el token de acceso.
    httpOptions: any;

    nombre = this.usuarios.getNombreRanking();

    // Constructor.
    constructor(public dialogRef: MatDialogRef<CodigoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.
    GenerarCodigo(): void {

        const id_ranking = {
            "id": this.usuarios.getIdRanking()
        };

        console.log(id_ranking);

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        // this._http.post(this.usuarios.URL + 'deleteuser', id_ranking, this.httpOptions).subscribe(() => {
        //     // Redirigir al usuario a la página anterior
        //     this.dialogRef.close('back');
        // })
    }

    // Funcion para cerrar la pestaña
    onBackClick(): void {

        // Para cerrar la pestaña
        this.dialogRef.close('back');
    }
}