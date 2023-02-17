import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumnos } from 'src/app/models/alumnos.model';
import { AlumnosService } from 'src/app/servicio/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  registerForm = new FormGroup({
    mote: new FormControl('', Validators.required),

    correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),

    password: new FormControl('', Validators.required),

    passwordRepe: new FormControl('', Validators.required),

    nombre: new FormControl('', Validators.required),

    apellidos: new FormControl('', Validators.required),

    date: new FormControl('', Validators.required),
  });

  constructor(
    private alumnos: AlumnosService, public router: Router
  ) { }

  ngOnInit(): void {
  }

  addAlumno(): void {

    let mote = this.registerForm.controls.mote.value!;
    let correo = this.registerForm.controls.correo.value!;
    let password = this.registerForm.controls.password.value!;
    let passwordRepe = this.registerForm.controls.passwordRepe.value!;
    let nombre = this.registerForm.controls.nombre.value!;
    let apellidos = this.registerForm.controls.apellidos.value!;
    let date = this.registerForm.controls.date.value!;

    const alumno: Alumnos = {
      "mote": mote,
      "correo": correo,
      "password": password,
      "nombre": nombre,
      "apellidos": apellidos,
      "date": date
    };

    console.log(alumno);

    if (password === passwordRepe) {
      this.alumnos.addAlumnos(alumno).subscribe({
        next: (value: Alumnos) => {
          console.log(value);
          this.router.navigate(['home']);
        }
      });

      this.registerForm.reset();
    } else {
      console.log("las contraseña no son iguales");
    }

  }
}
