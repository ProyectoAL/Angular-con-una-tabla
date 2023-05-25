// Imports.
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-EditarPuntuación',
    templateUrl: './EditarPuntuacion.component.html',
    styleUrls: ['./EditarPuntuacion.component.css']
})

export class EditarPuntuacionComponent {

    // Variable donde se guardara el token de acceso.
    httpOptions: any;

    id = this.usuarios.getIdEntrega();

    nombre = this.usuarios.getNombreAlumno();

    apellido = this.usuarios.getApellidosAlumno();

    ranking = this.usuarios.getIdRanking();

    practica = this.usuarios.getIdPractica();

    maxnota: any;

    element1 = false;
    element2 = false;

    // Constructor.
    constructor(public dialogRef: MatDialogRef<EditarPuntuacionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _http: HttpClient, public usuarios: UsuariosService) { }

    // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.

    EditPuntuacion = new FormGroup({
        nota: new FormControl('', Validators.required)
    });

    ngOnInit(): void {
        document.title = "Puntuación Entrega - GAMIFI-K"

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        this._http.get(this.usuarios.URL + `indexindividual/${this.ranking},${this.practica}`, this.httpOptions).subscribe((data: any) => {

            console.log(data);

            for (let dato of data) {
                this.maxnota = dato.puntuacion;

                console.log(this.maxnota);
            }

        });
    }

    EditarRanking(): void {

        if (this.EditPuntuacion.value.nota! > this.maxnota) {
            this.element1 = true;
            this.element2 = false;
        } else if (Number(this.EditPuntuacion.value.nota!) < 0) {
            this.element1 = false;
            this.element2 = true;
        } else {
            this.element1 = false;
            this.element2 = false;

            console.log(this.id);

            const editnota = {
                "id": this.id,
                "nota": this.EditPuntuacion.value.nota!,
            }

            this._http.put(this.usuarios.URL + `actualizarnota/${this.id}`, editnota, this.httpOptions).subscribe(() => {
                // Redirigir al usuario a la página anterior
                this.dialogRef.close('back');
            })
        }
    }

    // Funcion para cerrar la pestaña
    onBackClick(): void {

        // Para cerrar la pestaña
        this.dialogRef.close('back');
    }
}