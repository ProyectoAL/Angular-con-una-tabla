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

    codigo: any;

    // Constructor.
    constructor(public dialogRef: MatDialogRef<CodigoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.
    GenerarCodigo(): void {

        let id = this.usuarios.getIdRanking();

        console.log(id);

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        this._http.put(this.usuarios.URL + `updaterankingcode/${id}`, id, this.httpOptions).subscribe((data: any) => {
            // Redirigir al usuario a la página anterior

            const datos = data;

            console.log(datos);

            const codigo1 = datos.value;

            console.log(codigo1);


            this.codigo = codigo1.codigo;

            const ids = {
                "id_ranking": this.usuarios.getIdRanking(),
                "id_usuario": this.usuarios.getIdAlumno(),
                "codigo": this.codigo
            };

            console.log(ids);

            this._http.post(this.usuarios.URL + `updateranking/${ids.id_usuario}, ${ids.id_ranking}`, ids, this.httpOptions).subscribe((data: any) => {
                // Redirigir al usuario a la página anterior

                const datos = data;

                console.log(datos);

                this.dialogRef.close('back');
            });

        });
    }

    // Funcion para cerrar la pestaña
    onBackClick(): void {

        // Para cerrar la pestaña
        this.dialogRef.close('back');
    }
}