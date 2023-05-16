// Imports.
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
    selector: 'app-BorrarPuntos',
    templateUrl: './BorrarPuntos.component.html',
    styleUrls: ['./BorrarPuntos.component.css']
})

export class BorrarPuntosComponent {

    // Variable donde se guardara el token de acceso.
    httpOptions: any;

    id = this.usuarios.getIdEvaluacion();

    alumno = this.usuarios.getNombreAlumno();

    rango = this.usuarios.getNombreSoftSkill();

    puntos: any;

    // Constructor.
    constructor(public dialogRef: MatDialogRef<BorrarPuntosComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }

    ngOnInit(): void {
        document.title = "Borrar Puntos - GAMIFI-K"
    }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.
    BorrarPuntos(): void {

        console.log("La id de la evaluacion es " + this.id);

        let rango = this.usuarios.getNombreSoftSkill();
        let id_usuario = this.usuarios.getIdAlumno();
        let id_ranking = this.usuarios.getIdRanking();

        console.log(rango);
        console.log(id_usuario);
        console.log(id_ranking);

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };
        this._http.get(`${this.usuarios.URL}selectpuntos/${this.id}`, this.httpOptions).subscribe((data: any) => {
            // Redirigir al usuario a la página anterior

            this.puntos = data;

            console.log(this.puntos);

            // const puntosrango = {
            //     "rango": rango,
            //     "id_usuario": id_usuario,
            //     "id_ranking": id_ranking
            // };

            // this._http.post(`${this.usuarios.URL}selectpuntosrango`, puntosrango, this.httpOptions).subscribe((data: any) => {
            //     console.log(data);
            // });

            for (let punto of this.puntos) {
                const resta = {
                    "puntos": Number(punto.puntos_dados),
                    "rango": rango,
                    "id_usuario": id_usuario,
                    "id_ranking": id_ranking
                };

                console.log(resta);

                this._http.put(`${this.usuarios.URL}hacerresta`, resta, this.httpOptions).subscribe((data: any) => {
                    // Redirigir al usuario a la página anterior

                    console.log(data);
                });
            }
        });

        this._http.delete(`${this.usuarios.URL}deleteevaluacion/${this.id}`, this.httpOptions).subscribe(() => {
            // Redirigir al usuario a la página anterior
            this.dialogRef.close('back');
        });
    }

    // Funcion para cerrar la pestaña
    onBackClick(): void {

        // Para cerrar la pestaña
        this.dialogRef.close('back');
    }
}