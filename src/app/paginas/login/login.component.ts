import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { Registro } from 'src/app/models/registro.model';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  public loginForm = new FormGroup({

    mote: new FormControl('', Validators.required),

    password: new FormControl('', Validators.required),

  });

  constructor(private usuarios: UsuariosService, public router: Router) { }

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

    this.usuarios.login(login).subscribe({
      next: (value: Registro) => {
        console.log(value)
        this.router.navigate(['perfil']);
      }
    })

    this.loginForm.reset();
  }

}
