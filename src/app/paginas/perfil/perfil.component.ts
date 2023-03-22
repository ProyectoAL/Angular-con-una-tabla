import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from 'src/app/models/password.model';
import { Photo } from 'src/app/models/photo.model';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './DialogComponent.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  element1 = true;
  element2 = true;
  element3 = true;

  foto: any;

  cambiarFoto = new FormGroup({
    foto: new FormControl('', Validators.required)
  });

  cambiarContra = new FormGroup({
    newpassword: new FormControl('', Validators.required),
  });

  ponerCodigo = new FormGroup({
    codigo: new FormControl('', Validators.required)
  });

  constructor(public usuarios: UsuariosService, public router: Router, public dialog: MatDialog) { }

  info: any;
  token: any;
  update: any;

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


  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.info = JSON.parse(currentUser).value;
      this.token = JSON.parse(currentUser).access_token;
      console.log(this.token);

    }
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
