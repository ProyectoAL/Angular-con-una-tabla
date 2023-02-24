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

  alumnos: Alumnos[] = [];
  profesores: Profesores[] = [];

  ngOnInit(): void {
    console.log(this.usuarios.datosusuario);
  }

  getAlumno(): void {
    this.usuarios.getAlumnos().subscribe({
      next: (value: Alumnos[]) => {
        this.alumnos = [];
        this.alumnos = value;
      }
    })
  }

  getProfesor(): void {
    this.usuarios.getProfesores().subscribe({
      next: (value: Profesores[]) => {
        this.profesores = [];
        this.profesores = value;
      }
    })
  }

} 
