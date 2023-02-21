import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usuarios: UsuariosService) { }

  ngOnInit(): void {
    console.log(this.usuarios.datosusuario);
  }

}
