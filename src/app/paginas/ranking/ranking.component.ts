// Imports.
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from '../../servicio/usuarios.service';
import { DialogComponent } from './CrearPractica/DialogComponent.component';
import { BorrarPracticaComponent } from './BorrarPractica/BorrarPractica.component';
import { BorrarAlumnoComponent } from './BorrarAlumno/BorrarAlumno.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})

export class RankingComponent implements OnInit {

  // Variable donde se guardara el token.
  httpOptions: any;
  // Variable donde se guardara la información del usuario que esta dentro del navegador.
  info: any;
  // Variable donde se guardara el codigo del ranking. 
  codigo: any;

  // Variable donde se guardara las practicas.
  practicas: any[] = [];

  nombre: any;

  // Array donde se guardara la información del ranking.
  datos: any[] = [];

  private sub: any;

  id: number | undefined;

  //Contructor.
  constructor(public usuarios: UsuariosService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private _http: HttpClient) { }

  // Funcion que se ejecutara cada vez que se carge la paguina.
  ngOnInit(): void {

    // Asignando la información del navegador que esta dentro del item 'currentUser'.
    const currentUser = localStorage.getItem('currentUser');

    // If que se ejecutara si la variable currentUser no esta vacia.
    if (currentUser) {
      // Asignando a la variable info la información del apartado 'value' de dentro de la variable currentUser.
      this.info = JSON.parse(currentUser).value;
      // Mostrar por consola el contenido de la variable info.
      console.log(this.info);
      // Guardamos el id del usuario en la funcion setIdProfesor en el servicio usuarios.service.ts.
      this.usuarios.setIdProfesor(this.info.id);
    }

    // Asignamos el tipo de Content-Type y el token de acceso a la varible httpOptions.
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.codigo = +params['codigo'];
      console.log("La id del ranking es: " + this.id);
      console.log("El codigo del ranking es: " + this.codigo);


      this._http.get(this.usuarios.URL + `indexnombreranking/${this.id}`, this.httpOptions).subscribe((data: any) => {
        // Asignamos el contenido del select a la varoable datos.
        this.nombre = data;
        // Mostrar por consola el contenido de la variable datos.
        console.log(this.nombre);
      });

      // Codigo para ejecutar el select 'indexall' en Laravel.
      this._http.get(this.usuarios.URL + `indexall/${this.id}`, this.httpOptions).subscribe((data: any) => {
        // Asignamos el contenido del select a la varoable datos.
        this.datos = data;
        // Mostrar por consola el contenido de la variable datos.
        console.log(this.datos);
      });

      this._http.get(this.usuarios.URL + `indexpractica/${this.id}`, this.httpOptions).subscribe((data: any) => {
        this.practicas = data;
        console.log(this.practicas);
      });
    })

  }

  // Funcion para mostrar la pestaña para crear la practica.
  openDialog(): void {

    this.usuarios.setIdRanking(this.id);

    this.usuarios.setCodigoRanking(this.codigo);


    console.log(this.id);
    console.log(this.codigo);

    // Codigo para mostrar la pestaña.
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {}
    });
  }

  // Funcion para mostrar la pestaña para borrar la practica.
  openBorrarPractica(event: any, idPractica: any, nombrePractica: any): void {

    this.usuarios.setIdPractica(idPractica);
    this.usuarios.setNombrePractica(nombrePractica);

    // Codigo para mostrar la pestaña.
    let BorrardialogRef = this.dialog.open(BorrarPracticaComponent, {
      data: {}
    });
  }

  openBorrarAlumno(event: any, idAlumno: any, nombreAlumno: any) {

    this.usuarios.setIdAlumno(idAlumno);
    this.usuarios.setNombreAlumno(nombreAlumno);

    console.log(idAlumno);

    let BorrarAlumnoRef = this.dialog.open(BorrarAlumnoComponent, {
      data: {}
    });
  }
}
