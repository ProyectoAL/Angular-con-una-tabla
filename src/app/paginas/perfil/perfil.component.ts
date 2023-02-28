import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(public usuarios: UsuariosService, public router: Router) { }

  info = [{
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


} 
