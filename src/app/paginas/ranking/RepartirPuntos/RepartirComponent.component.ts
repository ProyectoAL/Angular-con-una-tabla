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
  softskills: any[] = [];

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

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    // Codigo para ejecutar el select 'indexall' en Laravel.
    this._http.get(this.usuarios.URL + `indexall/${this.id_ranking}`, this.httpOptions).subscribe((data: any) => {
      // Asignamos el contenido del select a la varoable datos.
      this.datos = data;
      // Mostrar por consola el contenido de la variable datos.
      console.log(this.datos);
    });

    this._http.get(this.usuarios.URL + 'nombresoftskills', this.httpOptions).subscribe((data: any) => {
      // Mostrar por consola el contenido de la variable datos.
      this.softskills = data;

      console.log(this.softskills);
    });
  }

  confirmarAlumno(mote: any): void {
    console.log(mote.value);
  }

  confirmarSoftSkill(rango: any): void {
    console.log(rango.value);
  }

  EnviarPuntos(mote: any, rango: any): void {

    const puntos = {
      "mote": mote.value,
      "rango": rango.value,
      "puntos": this.puntosSoftskills.controls.puntos.value!
    };

    console.log(puntos);
  }


  // Funcion para cerrar la pestaña
  onBackClick(): void {

    // Para cerrar la pestaña
    this.dialogRef.close('back');
  }
}