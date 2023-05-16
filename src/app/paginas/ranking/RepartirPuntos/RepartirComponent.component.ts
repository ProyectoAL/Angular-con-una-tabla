// Imports.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-Repartir',
  templateUrl: './RepartirComponent.component.html',
  styleUrls: ['./RepartirComponent.component.css']
})

export class RepartirComponent {

  // Variable donde se guardara el token de acceso.
  httpOptions: any;

  id_ranking = this.usuarios.getIdRanking();

  datos: any[] = [];

  motes: any[] = [];

  info: any;

  maxpuntos: any;

  element = false;

  id_usuario = this.usuarios.getIdAlumno();

  // Constructor.
  constructor(public dialogRef: MatDialogRef<RepartirComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public usuarios: UsuariosService,
    public _http: HttpClient) { }



  puntosSoftskills = new FormGroup({
    puntos: new FormControl('', Validators.required)
  });

  ngOnInit(): void {

    document.title = "Repartir Puntos - GAMIFI-K"

    const currentUser = localStorage.getItem('currentUser');

    // If que se ejecutara si la variable currentUser no esta vacia.
    if (currentUser) {
      // Asignando a la variable info la información del apartado 'value' de dentro de la variable currentUser.
      this.info = JSON.parse(currentUser).value;
      // Mostrar por consola el contenido de la variable info.
      console.log(this.info);
    }

    console.log(this.id_usuario);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };
    // Codigo para ejecutar el select 'indexall' en Laravel.
    this._http.get(this.usuarios.URL + `indexespecifico/${this.id_usuario},${this.id_ranking}`, this.httpOptions).subscribe((data: any) => {
      // Asignamos el contenido del select a la varoable datos.
      this.datos = data;

      for (let dato of this.datos) {

        console.log(dato.id_usuario);

        this.usuarios.motesfiltrados(dato.id_usuario, dato.id_ranking).subscribe({
          next: (value: any) => {
            this.motes.push(value);
            console.log(this.motes);
          }
        });
      }
    });
  }

  confirmarAlumno(mote: any): void {
    console.log(mote.value);
  }

  confirmarSoftSkill(rango: any): void {
    console.log(rango.value);
  }

  EnviarPuntos(mote: any, rango: any): void {

    this.maxpuntos = Number(this.puntosSoftskills.controls.puntos.value!);

    if (this.maxpuntos >= 1500) {
      this.element = true;
    } else {
      this.element = false;
      const puntos = {
        "id_usuario": Number(mote.value),
        "id_ranking": this.id_ranking,
        "rango": rango.value,
        "puntos": Number(this.puntosSoftskills.controls.puntos.value!)
      };

      console.log(puntos);

      this._http.put(this.usuarios.URL + 'updatepuntosmedallas', puntos, this.httpOptions).subscribe(() => {
        // Redirigir al usuario a la página anterior
        this.dialogRef.close('back');
      });

      const historial = {
        "id_ranking": this.id_ranking,
        "alumno_evaluador": this.info.id,
        "alumno_evaluado": mote.value,
        "puntos_dados": Number(this.puntosSoftskills.controls.puntos.value!),
        "soft_skill": rango.value
      };

      console.log(historial);

      this._http.post(this.usuarios.URL + 'createhistorial', historial, this.httpOptions).subscribe(() => {
        // Redirigir al usuario a la página anterior
        this.dialogRef.close('back');
      });
    }
  }


  // Funcion para cerrar la pestaña
  onBackClick(): void {

    // Para cerrar la pestaña
    this.dialogRef.close('back');
  }
}