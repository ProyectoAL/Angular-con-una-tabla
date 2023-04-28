// Imports.
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-UpdateRanking',
    templateUrl: './UpdateRanking.component.html',
    styleUrls: ['./UpdateRanking.component.css']
})

export class UpdateRankingComponent {

    // Variable donde se guardara el token de acceso.
    httpOptions: any;

    id = this.usuarios.getIdRanking();

    nombre = this.usuarios.getNombreRanking();

    // Constructor.
    constructor(public dialogRef: MatDialogRef<UpdateRankingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.

    EditRanking = new FormGroup({
        nombre: new FormControl('', Validators.required)
    });

    EditarRanking(): void {

        console.log(this.id);

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        const editranking = {
            "id": this.id,
            "nombre": this.EditRanking.value.nombre,
        }

        this._http.put(this.usuarios.URL + 'updatenombre', editranking, this.httpOptions).subscribe(() => {
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