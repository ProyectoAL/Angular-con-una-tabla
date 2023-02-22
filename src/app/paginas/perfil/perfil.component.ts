import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private usuarios: UsuariosService) { }

  ngOnInit(): void {
    console.log(this.usuarios.datosusuario);
  }

}
