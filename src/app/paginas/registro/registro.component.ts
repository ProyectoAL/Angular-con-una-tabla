// Importes de las herramientas necesarias.
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { Alumnos } from 'src/app/models/alumnos.model';
import { Profesores } from 'src/app/models/profesores.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // Booleano para las funciones showData y hideData
  element = true;

  // Booleano para mostrar el mensaje de error de la comprobación de la contraseña.
  error = true;

  // Creacion del FromGroup "registerForm" y comprobando si los campos estan vacios o no.
  AlumnosForm = new FormGroup({
    mote: new FormControl('', Validators.required),

    correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),

    password: new FormControl('', Validators.required),

    passwordRepe: new FormControl('', Validators.required),

    nombre: new FormControl('', Validators.required),

    apellidos: new FormControl('', Validators.required),

    date: new FormControl('', Validators.required),

  });

  ProfesoresForm = new FormGroup({
    mote: new FormControl('', Validators.required),

    correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),

    password: new FormControl('', Validators.required),

    passwordRepe: new FormControl('', Validators.required),

    nombre: new FormControl('', Validators.required),

    apellidos: new FormControl('', Validators.required),

    centro: new FormControl('', Validators.required)
  });

  // Contructor donde ponemos la infomracion del service en la variable usuarios 
  // y la información del Router en la variable router.
  constructor(
    private usuarios: UsuariosService, public router: Router
  ) { }

  ngOnInit(): void {
  }

  // Funcion que se ejecutara una vez se haya hecho clic en el boton de registro con los campos llenos.
  addAlumno(): void {
    // Insertamos la información del Formgroup en unas nuevas variables.
    let mote = this.AlumnosForm.controls.mote.value!;
    let correo = this.AlumnosForm.controls.correo.value!;
    let password = this.AlumnosForm.controls.password.value!;
    let passwordRepe = this.AlumnosForm.controls.passwordRepe.value!;
    let nombre = this.AlumnosForm.controls.nombre.value!;
    let apellidos = this.AlumnosForm.controls.apellidos.value!;
    let date = this.AlumnosForm.controls.date.value!;

    // Insertamos la información de las variables anteriores en las variables del modelo "Registro".
    const alumno: Alumnos = {
      "mote": mote,
      "email": correo,
      "password": password,
      "name": nombre,
      "lastname": apellidos,
      "date": date
    };

    // Comando para comprobar que la información se guarda en el modelo.
    console.log(alumno);

    //Linea de comandos para enviar la información a la funciond el service 
    //si la comprobacion de la contaseña es correcta.
    if (password === passwordRepe) {
      this.usuarios.addAlumnos(alumno).subscribe({
        next: (value: Alumnos) => {
          console.log(value);
          // Comando para ir a la paguina de perfiles.
          this.router.navigate(['perfil']);
        }
      });
      // Comando para borrar el contenido de los inputs del formulario.
      this.AlumnosForm.reset();
    } else {
      // mensaje de error que saldra por la consola del navegador.
      console.log("las contraseña no son iguales");
      this.error = false;
    }

  }

  addProfesor(): void {
    // Insertamos la información del Formgroup en unas nuevas variables.
    let mote = this.ProfesoresForm.controls.mote.value!;
    let correo = this.ProfesoresForm.controls.correo.value!;
    let password = this.ProfesoresForm.controls.password.value!;
    let passwordRepe = this.ProfesoresForm.controls.passwordRepe.value!;
    let nombre = this.ProfesoresForm.controls.nombre.value!;
    let apellidos = this.ProfesoresForm.controls.apellidos.value!;
    let centro = this.ProfesoresForm.controls.centro.value!;

    // Insertamos la información de las variables anteriores en las variables del modelo "Registro".
    const profesor: Profesores = {
      "mote": mote,
      "email": correo,
      "password": password,
      "name": nombre,
      "lastname": apellidos,
      "centro": centro
    };

    // Comando para comprobar que la información se guarda en el modelo.
    console.log(profesor);

    //Linea de comandos para enviar la información a la funciond el service 
    //si la comprobacion de la contaseña es correcta.
    if (password === passwordRepe) {
      this.usuarios.addProfesores(profesor).subscribe({
        next: (value: Profesores) => {
          console.log(value);
          // Comando para ir a la paguina de perfiles.
          this.router.navigate(['perfil']);
        }
      });
      // Comando para borrar el contenido de los inputs del formulario.
      this.ProfesoresForm.reset();
    } else {
      // mensaje de error que saldra por la consola del navegador.
      console.log("las contraseña no son iguales");
      this.error = false;
    }

  }

  // Funcion para mostrar el formulario de profesores.
  showData() {
    this.element = false;
  }
  // Funcion para mostrar el formulario de alumnos.
  hideData() {
    this.element = true;
  }

}
