import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumnos } from 'src/app/models/alumnos.model';
import { Login } from 'src/app/models/login.model';
import { Profesores } from 'src/app/models/profesores.model';
import { AlumnosService } from 'src/app/servicio/alumnos.service';
import { ProfesorService } from 'src/app/servicio/profesores.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  [x: string]: any;

  public loginForm = new FormGroup({

    mote: new FormControl('', Validators.required),

    password: new FormControl('', Validators.required),

  });

  constructor(private alumnos: AlumnosService, private profesores: ProfesorService, public router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    let mote = this.loginForm.controls.mote.value!;

    let password = this.loginForm.controls.password.value!;

    console.log(
      mote
    );
    console.log(
      password
    );

    const login: Login = {
      "mote": mote,
      "password": password
    };

    console.log(login);

    this.alumnos.login(login).subscribe({
      next: (value: Alumnos) => {
        console.log(value)
        this.router.navigate(['home']);
      }
    })

    this.profesores.login(login).subscribe({
      next: (value: Profesores) => {
        console.log(value)
        this.router.navigate(['home']);
      }
    })
    this.loginForm.reset();
  }

}
