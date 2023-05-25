// Imports.
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { BorrarPuntosComponent } from '../BorrarPuntos/BorrarPuntos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialComponent implements OnInit {

  // Variable donde se guardara el token.
  httpOptions: any;

  nombre: any;

  Alumno_evaluador: any;
  Alumno_evaluado: any;

  // Array donde se guardara la información del ranking.
  datos: any[] = [];

  private sub: any;

  id_ranking: number | undefined;

  BuscadorForm = new FormGroup({
    buscador: new FormControl('', Validators.required)
  });

  //Contructor.
  constructor(public usuarios: UsuariosService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private _http: HttpClient) { }

  // Funcion que se ejecutara cada vez que se carge la paguina.
  ngOnInit(): void {

    document.title = "Historial Evaluaciones - GAMIFI-K"

    // Asignamos el tipo de Content-Type y el token de acceso a la varible httpOptions.
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    this.sub = this.route.params.subscribe(params => {
      this.id_ranking = params['id'];
      console.log("La id del ranking es: " + this.id_ranking);

      this._http.get(this.usuarios.URL + `index/${this.id_ranking}`, this.httpOptions).subscribe((data: any) => {
        // Asignamos el contenido del select a la varoable datos.
        this.nombre = data;

        // Mostrar por consola el contenido de la variable datos.
        console.log(this.nombre);
      });

      this._http.get(this.usuarios.URL + `indexhistorial/${this.id_ranking}`, this.httpOptions).subscribe((data: any) => {
        // Asignamos el contenido del select a la varoable datos.
        this.datos = data;

        // Mostrar por consola el contenido de la variable datos.
        console.log(this.datos);
      });

    });
  }

  openBorrarPuntos(event: any, nombreAlumno: any, nombreSoftSkill: any, idEvaluacio: any, idAlumno: any): void {

    console.log("Nombre del alumno " + nombreAlumno);
    console.log("Nombre del rango " + nombreSoftSkill);
    console.log("Id evaluacion " + idEvaluacio);
    console.log("Id alumno " + idAlumno);
    console.log("Id ranking " + this.id_ranking);

    this.usuarios.setNombreAlumno(nombreAlumno);
    this.usuarios.setNombreSoftSkill(nombreSoftSkill);
    this.usuarios.setIdEvaluacion(idEvaluacio);
    this.usuarios.setIdAlumno(idAlumno);
    this.usuarios.setIdRanking(this.id_ranking);

    // Codigo para mostrar la pestaña.
    let BorrardialogRef = this.dialog.open(BorrarPuntosComponent, {
      data: {}
    });
  }

  Buscador() {
    let dato = this.BuscadorForm.value.buscador

    console.log(dato);

    this._http.get(this.usuarios.URL + `filtro/${dato}`, this.httpOptions).subscribe((data: any) => {
      // Asignamos el contenido del select a la varoable datos.
      this.datos = data;
      // Mostrar por consola el contenido de la variable datos.
      console.log(this.datos);
    });
  }

}
