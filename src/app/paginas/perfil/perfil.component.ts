import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from 'src/app/models/password.model';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  element = true;

  cambiarContra = new FormGroup({
    newpassword: new FormControl('', Validators.required)
  });

  constructor(public usuarios: UsuariosService, public router: Router) { }

  info = [{
    "id": this.usuarios.datosusuario.id,
    "mote": this.usuarios.datosusuario.mote,
    "email": this.usuarios.datosusuario.email,
    "password": this.usuarios.datosusuario.password,
    "name": this.usuarios.datosusuario.name,
    "lastname": this.usuarios.datosusuario.lastname,
    "date": this.usuarios.datosusuario.date,
    "centro": this.usuarios.datosusuario.centro,
    "rol": this.usuarios.datosusuario.role
  }];

  ngOnInit(): void {
    console.log(this.info);
  }

  logout() {
    console.log(this.info);
    this.info.splice(0, this.info.length);
    this.router.navigate(['']);
  }

  changepassword(): void {
    let password = this.cambiarContra.controls.newpassword.value!;
    let id = this.usuarios.datosusuario.id;

    const changedpassword: Password = {
      "id": id,
      "password": password
    };

    console.log(changedpassword);

    this.usuarios.changepassword(changedpassword).subscribe({
      next: (value: Password) => {
        console.log(value);
        console.log(this.usuarios.datosusuario)
      }
    });
    this.cambiarContra.reset();
  }

  showButton() {
    this.element = false;
  }

  hideButton() {
    this.element = true;
  }

} 
