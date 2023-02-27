import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  constructor(public usuarios: UsuariosService) { }

  info = [{
    "mote": this.usuarios.datosusuario.mote,
    "email": this.usuarios.datosusuario.email,
    "password": this.usuarios.datosusuario.password,
    "name": this.usuarios.datosusuario.name,
    "lastname": this.usuarios.datosusuario.lastname,
    "date": this.usuarios.datosusuario.date,
    "centro": this.usuarios.datosusuario.centro
  }];

  ngOnInit(): void {

    console.log(this.info);
  }

} 
