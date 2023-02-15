import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfesorService } from '../../servicio/profesores.service';
import { Profesores } from '../../models/profesores.model';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  mote: FormControl = new FormControl('')
  correo: FormControl = new FormControl('')
  password: FormControl = new FormControl('')
  nombre: FormControl = new FormControl('')
  apellidos: FormControl = new FormControl('')
  centro: FormControl = new FormControl('')

  constructor(
    private profesores: ProfesorService

  ) { }

  ngOnInit(): void {
    this.profesores.getProfesores().subscribe(
      (value: Profesores[]) => {
        console.log(value);
      }
    )
  }
  addProfesor(): void {
    let mote = this.mote.value;
    let correo = this.correo.value;
    let password = this.password.value;
    let nombre = this.nombre.value;
    let apellidos = this.apellidos.value;
    let centro = this.centro.value;
    const profesor: Profesores = {
      mote: mote,
      correo: correo,
      password: password,
      nombre: nombre,
      apellidos: apellidos,
      centro: centro
    };
    this.profesores.addProfesores(profesor).subscribe({

      next: (value: Profesores) => {
        console.log(value)
      }
    });
    this.mote.reset()
    this.correo.reset()
    this.password.reset()
    this.nombre.reset()
    this.apellidos.reset()
    this.centro.reset();
  }

}
