// Imports.
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from '../../servicio/usuarios.service';
import { DialogComponent } from './DialogComponent.component';
import { BorrarDialogComponent } from './BorrarDialogComponent.component';

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
  // Variable donde se guardara el nombre del ranking.
  nombre: any;
  // Variable donde se guardara las practicas.
  practicas: any[] = [];

  // Array donde se guardara la información del ranking.
  datos: any[] = [];

  //Contructor.
  constructor(public usuarios: UsuariosService,
    public dialog: MatDialog,
    public router: Router,
    private _http: HttpClient) { }

  // Funcion que se ejecutara cada vez que se carge la paguina.
  ngOnInit(): void {

    // Asignando la información del navegador que esta dentro del item 'currentUser'.
    const currentUser = localStorage.getItem('currentUser');

    // Asignando el nombre del ranking a la variable nombre.
    this.nombre = this.usuarios.getNombreRanking();

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

    //Guardamos el codigo del ranking en la funcion getCodigoRanking en el servicio usuarios.service.ts.
    this.codigo = this.usuarios.getCodigoRanking();

    // Mostrar por consola el codigo del ranking.
    console.log(this.codigo);

    // Codigo para ejecutar el select 'indexall' en Laravel.
    this._http.post(this.usuarios.URL + `indexall/${this.codigo}`, this.codigo, this.httpOptions).subscribe((data: any) => {
      // Asignamos el contenido del select a la varoable datos.
      this.datos = data;
      // Mostrar por consola el contenido de la variable datos.
      console.log(this.datos);
    });

    this._http.post(this.usuarios.URL + `indexpractica/${this.codigo}`, this.codigo, this.httpOptions).subscribe((data: any) => {
      this.practicas = data;
      console.log(this.practicas);
    });

  }

  // Funcion para mostrar la pestaña para crear la practica.
  openDialog(): void {

    // Codigo para mostrar la pestaña.
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {}
    });
  }

  // Funcion para mostrar la pestaña para borrar la practica.
  openBorrarDialog(event: any, idPractica: any, nombrePractica: any): void {

    this.usuarios.setIdPractica(idPractica);
    this.usuarios.setNombrePractica(nombrePractica);

    // Codigo para mostrar la pestaña.
    let BorrardialogRef = this.dialog.open(BorrarDialogComponent, {
      data: {}
    });
  }

}
