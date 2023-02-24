import { Component, OnInit } from '@angular/core';
import { Alumnos } from 'src/app/models/alumnos.model';
import { Profesores } from 'src/app/models/profesores.model';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(public usuarios: UsuariosService) { }

  ngOnInit(): void {
    console.log(this.usuarios.datosusuario.mote);
    let divsito = document.getElementById("contenido")!;
    divsito.innerHTML = JSON.stringify(this.usuarios.datosusuario.mote);
  }

} 
