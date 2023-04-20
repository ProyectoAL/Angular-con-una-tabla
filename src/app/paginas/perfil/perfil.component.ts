import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from 'src/app/models/password.model';
import { Photo } from 'src/app/models/photo.model';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './DialogComponent.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rankings } from 'src/app/models/rankings.model';
import { CodigoComponent } from './Codigo.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  httpOptions: any;
  foto: any;
  info: any;
  token: any;
  update: any;

  datos: any[] = [];

  element1 = true;
  element2 = true;
  element3 = true;
  element4 = true;

  cambiarFoto = new FormGroup({
    foto: new FormControl('', Validators.required)
  });

  cambiarContra = new FormGroup({
    newpassword: new FormControl('', Validators.required),
  });

  ponerCodigo = new FormGroup({
    codigo: new FormControl('', Validators.required)
  });

  constructor(public usuarios: UsuariosService, public router: Router, public dialog: MatDialog, private _http: HttpClient) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.info = JSON.parse(currentUser).value;
      this.token = JSON.parse(currentUser).access_token;
      console.log(this.info);
      console.log(this.token);

    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    if (this.info.role === 'Alumno') {
      this._http.post(this.usuarios.URL + `indexa/${this.info.mote}`, this.info.mote, this.httpOptions).subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);

      });
    }

    if (this.info.role === 'Profesor') {
      this._http.post(this.usuarios.URL + `indexranking/${this.info.mote}`, this.info.mote, this.httpOptions).subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);

      });
    }

  }


  Ranking(): void {
    // Insertamos la información del Formgroup en unas nuevas variables.
    let codigo = this.ponerCodigo.controls.codigo.value!;
    let id = this.info.id;
    let mote = this.info.mote;

    // Insertamos la información de las variables anteriores en las variables del modelo "Registro".
    const ranking: Rankings = {
      "codigo": codigo,
      "id_usuario": id,
      "mote": mote
    };

    // Comando para comprobar que la información se guarda en el modelo.
    console.log(ranking);

    //Linea de comandos para enviar la información a la funciond el service 
    //si la comprobacion de la contaseña es correcta.
    this.usuarios.Rankings(ranking).subscribe({
      next: (value: Rankings) => {
        console.log(value);
        // Comando para ir a la paguina de perfiles.
        this.router.navigate(['../ranking']);
        this.usuarios.setCodigoRanking(ranking.codigo);
      }
    });
    // Comando para borrar el contenido de los inputs del formulario.
    this.ponerCodigo.reset();

  }

  onFileChange(event: any) {
    this.foto = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(this.foto);
    reader.onload = (event: any) => {
      this.foto = reader.result;

      console.log(this.foto);
    }
  }

  changephoto(): void {

    let img = this.foto;

    let id = this.info.id;

    const changedphoto: Photo = {
      "id": id,
      "img": img
    };

    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.update = JSON.parse(currentUser);
      this.update.value.img = changedphoto.img;
      this.update.access_token = this.token;
      console.log(this.token);
    }
    localStorage.setItem('currentUser', JSON.stringify(this.update));

    console.log(changedphoto);

    this.usuarios.changephoto(changedphoto).subscribe({
      next: (value: Photo) => {
        console.log(value);
        console.log(this.usuarios.datosusuario);
      }
    });
    this.cambiarContra.reset();
  }

  changepassword(): void {

    let password = this.cambiarContra.controls.newpassword.value!;

    let id = this.info.id;

    const changedpassword: Password = {
      "id": id,
      "password": password,
    };

    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.update = JSON.parse(currentUser);
      this.update.value.password = changedpassword.password;
      this.update.access_token = this.token;
      console.log(this.token);
    }

    localStorage.setItem('currentUser', JSON.stringify(this.update));

    console.log(changedpassword);

    this.usuarios.changepassword(changedpassword).subscribe({
      next: (value: Password) => {
        console.log(value);
        console.log(this.usuarios.datosusuario);
      }
    });
    this.cambiarContra.reset();
  }

  pillarCodigo(event: any, codigoranking: string, nombre: any, idranking: any) {

    this.usuarios.setCodigoRanking(codigoranking);

    this.usuarios.setNombreRanking(nombre);

    this.usuarios.setIdRanking(idranking);

    console.log(codigoranking);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'home') {
        localStorage.removeItem('currentUser');
        this.info = null;
        console.log(this.info);
        this.router.navigate(['']);
      }
    });
  }

  GenerarCodigo(event: any, idranking: string, nombreranking: any, codigo: any): void {
    const dialogRef = this.dialog.open(CodigoComponent, {
      data: {}
    });

    this.usuarios.setIdRanking(idranking);

    this.usuarios.setIdAlumno(this.info.id);

    this.usuarios.setCodigoRanking(codigo);

    this.usuarios.setNombreRanking(nombreranking);

  }

  showButton1() {
    this.element1 = false;
  }

  hideButton1() {
    this.element1 = true;
  }

  showButton2() {
    this.element2 = false;
  }

  hideButton2() {
    this.element2 = true;
  }

  showButton3() {
    this.element3 = false;
  }

  hideButton3() {
    this.element3 = true;
  }
} 
