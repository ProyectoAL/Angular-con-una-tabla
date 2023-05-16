// Imports.
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
    selector: 'app-CrearRanking',
    templateUrl: './CrearRanking.component.html',
    styleUrls: ['./CrearRanking.component.css']
})

export class CrearRankingComponent {

    // Variable donde se guardara el token de acceso.
    httpOptions: any;

    nombre = this.usuarios.getNombreRanking();

    info: any;

    // Constructor.
    constructor(public dialogRef: MatDialogRef<CrearRankingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.

    nombreRanking = new FormGroup({
        nombre: new FormControl('', Validators.required)
    });

    ngOnInit(): void {
        document.title = "Crear Ranking - GAMIFI-K"
    }

    CrearRanking(): void {

        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            this.info = JSON.parse(currentUser).value;
            console.log(this.info);
        }

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        const ranking = {
            "codigo": "",
            "nombre": this.nombreRanking.value.nombre,
            "id_profesor": this.info.id
        };

        console.log(ranking);

        this._http.post(this.usuarios.URL + 'Createranking', ranking, this.httpOptions).subscribe((data: any) => {
            console.log(data);
        });
        this.dialogRef.close('back');
    }

    // Funcion para cerrar la pestaña
    onBackClick(): void {

        // Para cerrar la pestaña
        this.dialogRef.close('back');
    }
}