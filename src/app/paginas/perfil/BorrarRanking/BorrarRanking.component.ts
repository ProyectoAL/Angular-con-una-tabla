// Imports.
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
    selector: 'app-BorrarRanking',
    templateUrl: './BorrarRanking.component.html',
    styleUrls: ['./BorrarRanking.component.css']
})

export class BorrarRankingComponent {

    // Variable donde se guardara el token de acceso.
    httpOptions: any;

    nombre = this.usuarios.getNombreRanking();


    // Constructor.
    constructor(public dialogRef: MatDialogRef<BorrarRankingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }


    ngOnInit(): void {
        document.title = "Borrar Ranking - GAMIFI-K"
    }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.
    BorrarRanking(): void {

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        const borrar = {
            "id_ranking": this.usuarios.getIdRanking()
        }

        console.log(borrar);

        this._http.post(this.usuarios.URL + 'deleteranking', borrar, this.httpOptions).subscribe(() => {
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