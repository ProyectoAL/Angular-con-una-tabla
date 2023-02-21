import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { Registro } from 'src/app/models/registro.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  element = true;

  registerForm = new FormGroup({
    mote: new FormControl('', Validators.required),

    correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),

    password: new FormControl('', Validators.required),

    passwordRepe: new FormControl('', Validators.required),

    nombre: new FormControl('', Validators.required),

    apellidos: new FormControl('', Validators.required),

    date: new FormControl('', Validators.required),

    centro: new FormControl('', Validators.required)
  });

  constructor(
    private alumnos: UsuariosService, public router: Router
  ) { }

  ngOnInit(): void {
  }

  addUsuario(): void {

    let mote = this.registerForm.controls.mote.value!;
    let correo = this.registerForm.controls.correo.value!;
    let password = this.registerForm.controls.password.value!;
    let passwordRepe = this.registerForm.controls.passwordRepe.value!;
    let nombre = this.registerForm.controls.nombre.value!;
    let apellidos = this.registerForm.controls.apellidos.value!;
    let date = this.registerForm.controls.date.value!;

    const alumno: Registro = {
      "mote": mote,
      "correo": correo,
      "password": password,
      "nombre": nombre,
      "apellidos": apellidos,
      "date": date,
      centro: null
    };

    console.log(alumno);

    if (password === passwordRepe) {
      this.alumnos.addUsuarios(alumno).subscribe({
        next: (value: Registro) => {
          console.log(value);
          this.router.navigate(['home']);
        }
      });
      this.registerForm.reset();
    } else {
      console.log("las contraseña no son iguales");
    }

  }

  showData() {
    this.element = false;
  }

  hideData() {
    this.element = true;
  }
}
