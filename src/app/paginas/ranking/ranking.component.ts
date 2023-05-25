// Imports.
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from '../../servicio/usuarios.service';
import { DialogComponent } from './CrearPractica/DialogComponent.component';
import { BorrarPracticaComponent } from './BorrarPractica/BorrarPractica.component';
import { BorrarAlumnoComponent } from './BorrarAlumno/BorrarAlumno.component';
import { SoftSkillsComponent } from './SoftSkills/SoftSkillsComponent.component';
import { RepartirComponent } from './RepartirPuntos/RepartirComponent.component';


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

  idDistinct: any[] = [];

  medalla1: any[] = [];
  medalla2: any[] = [];
  medalla3: any[] = [];
  medalla4: any[] = [];
  medalla5: any[] = [];


  // Array donde se guardara la información del ranking.
  datos: any[] = [];

  private sub: any;

  id: number | undefined;

  softskills: any[] = [];

  //Contructor.
  constructor(public usuarios: UsuariosService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private _http: HttpClient) { }

  // Funcion que se ejecutara cada vez que se carge la paguina.
  ngOnInit(): void {

    document.title = "Ranking - GAMIFI-K"

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
      this.id = params['id'];
      this.codigo = params['codigo'];
      console.log("La id del ranking es: " + this.id);
      console.log("El codigo del ranking es: " + this.codigo);

      this._http.get(this.usuarios.URL + `index/${this.id}`, this.httpOptions).subscribe((data: any) => {
        // Asignamos el contenido del select a la varoable datos.
        this.nombre = data;

        // Mostrar por consola el contenido de la variable datos.
        console.log(this.nombre);
      });

      // Codigo para ejecutar el select 'indexall' en Laravel.
      this._http.get(this.usuarios.URL + `indexall/${this.id}`, this.httpOptions).subscribe((data: any) => {
        // Asignamos el contenido del select a la varoable datos.
        this.datos = data;

        for (let puntos of this.datos) {

          this.usuarios.Medalla1(puntos.Responsabilidad).subscribe({
            next: (value: any) => {
              this.medalla1.push(value);
              console.log(this.medalla1);
            }
          });

          this.usuarios.Medalla2(puntos.Cooperacion).subscribe({
            next: (value: any) => {
              this.medalla2.push(value);
              console.log(this.medalla2);
            }
          });

          this.usuarios.Medalla3(puntos.Autonomia_e_iniciativa).subscribe({
            next: (value: any) => {
              this.medalla3.push(value);
              console.log(this.medalla3);
            }
          });

          this.usuarios.Medalla4(puntos.Gestion_emocional).subscribe({
            next: (value: any) => {
              this.medalla4.push(value);
              console.log(this.medalla4);
            }
          });

          this.usuarios.Medalla5(puntos.abilidades_de_pensamiento).subscribe({
            next: (value: any) => {
              this.medalla5.push(value);
              console.log(this.medalla5);
            }
          });
        }

        // Mostrar por consola el contenido de la variable datos.
        console.log(this.datos);
      });

      console.log(this.datos);

      this._http.get(this.usuarios.URL + `indexpractica/${this.id}`, this.httpOptions).subscribe((data: any) => {
        this.practicas = data;
        console.log(this.practicas);
      });

    });
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

  openRepartirPuntos(event: any, idRanking: any, idAlumno: any) {
    this.usuarios.setIdRanking(idRanking);
    this.usuarios.setIdAlumno(idAlumno);

    // Codigo para mostrar la pestaña.
    let RepartirdialogRef = this.dialog.open(RepartirComponent, {
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

  openBorrarAlumno(event: any, idAlumno: any, nombreAlumno: any, idRanking: any) {

    this.usuarios.setIdAlumno(idAlumno);
    this.usuarios.setNombreAlumno(nombreAlumno);
    this.usuarios.setIdRanking(idRanking);

    console.log(idAlumno);
    console.log(nombreAlumno);
    console.log(idRanking);

    let BorrarAlumnoRef = this.dialog.open(BorrarAlumnoComponent, {
      data: {}
    });
  }

  openSoftSkills(event: any, nombreSoftSkill: any) {

    this.usuarios.setNombreSoftSkill(nombreSoftSkill);

    console.log(nombreSoftSkill);

    let BorrarAlumnoRef = this.dialog.open(SoftSkillsComponent, {
      data: {}
    });
  }
}
