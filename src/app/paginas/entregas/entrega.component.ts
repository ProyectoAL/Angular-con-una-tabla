// Imports.
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from '../../servicio/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ranking',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})

export class EntregaComponent implements OnInit {

  // Variable donde se guardara el token.
  httpOptions: any;
  // Variable donde se guardara la información del usuario que esta dentro del navegador.
  info: any;
  // Variable donde se guardara el codigo del ranking. 
  codigo: any;
  // Variable donde se guardara las practicas.
  practicas1: any[] = [];

  practicas2: any[] = [];

  nombre: any[] = [];

  entrega: any;

  element1 = true;

  private sub: any;

  id: number | undefined;

  id_ranking: number | undefined;

  // Array donde se guardara la información del ranking.
  datos: any[] = [];

  //Contructor.
  constructor(public usuarios: UsuariosService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private _http: HttpClient) { }

  subirentrega = new FormGroup({
    entrega: new FormControl('', Validators.required)
  });

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
      this.id_ranking = + params['id_ranking'];
      console.log("La id de la practica es: " + this.id);
      console.log("La id del ranking es: " + this.id_ranking);

      this._http.get(this.usuarios.URL + `indexpractica/${this.id}`, this.httpOptions).subscribe((data: any) => {
        this.nombre = data;
        console.log(this.nombre);
      });
    })

    if (this.info.role == 'Alumno') {


      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.id_ranking = + params['id_ranking'];
        console.log("La id de la practica es: " + this.id);
        console.log("La id del ranking es: " + this.id_ranking);

        this._http.get(this.usuarios.URL + `indexindividual/${this.id},${this.id_ranking}`, this.httpOptions).subscribe((data: any) => {
          this.practicas1 = data;
          console.log(this.practicas1);
        });
      })
    }

    if (this.info.role == 'Profesor') {



      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
        console.log('1');

        this._http.get(this.usuarios.URL + `indexentrega/${this.id}`, this.httpOptions).subscribe((data: any) => {
          this.practicas2 = data.Value;

          console.log(this.practicas2);
        });
      })


    }

  }

  onFileChange(event: any) {
    this.entrega = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(this.entrega);
    reader.onload = (event: any) => {
      this.entrega = reader.result;

      console.log(this.entrega);
    }
  }

  Entrega(): void {

    const entregar = {
      "id_usuario": this.info.id,
      "entrega": this.entrega,
      "mote": this.info.mote,
      "nombre": this.info.name,
      "lastname": this.info.lastname,
      "id_practicas": this.usuarios.getIdPractica(),
      "nota": "NaN"
    };

    console.log(entregar);

    this._http.post(this.usuarios.URL + 'entrega', entregar, this.httpOptions).subscribe((data: any) => {
      this.practicas1 = data;
      console.log(this.practicas1);
    });

    this.subirentrega.reset();
  }

  showButton1() {
    this.element1 = false;
  }

  hideButton1() {
    this.element1 = true;
  }

}
