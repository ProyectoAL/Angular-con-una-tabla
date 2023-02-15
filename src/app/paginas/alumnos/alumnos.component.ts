import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Alumnos } from 'src/app/models/alumnos.model';
import { AlumnosService } from 'src/app/servicio/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  mote: FormControl = new FormControl('')
  correo: FormControl = new FormControl('')
  password: FormControl = new FormControl('')
  nombre: FormControl = new FormControl('')
  apellidos: FormControl = new FormControl('')
  date: FormControl = new FormControl('')

  constructor(
    private alumnos: AlumnosService
  ) { }

  ngOnInit(): void {
    this.alumnos.getAlumnos().subscribe(
      (value: Alumnos[]) => {
        console.log(value);
      }
    )
  }
  addAlumno(): void {
    let mote = this.mote.value;
    let correo = this.correo.value;
    let password = this.password.value;
    let nombre = this.nombre.value;
    let apellidos = this.apellidos.value;
    let date = this.date.value;
    const alumno: Alumnos = {
      mote: mote,
      correo: correo,
      password: password,
      nombre: nombre,
      apellidos: apellidos,
      date: date
    };
    this.alumnos.addAlumnos(alumno).subscribe({

      next: (value: Alumnos) => {
        console.log(value)
      }
    });
    this.mote.reset()
    this.correo.reset()
    this.password.reset()
    this.nombre.reset()
    this.apellidos.reset()
    this.date.reset();
  }
}
