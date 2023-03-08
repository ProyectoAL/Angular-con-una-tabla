import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from 'src/app/models/password.model';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './DialogComponent.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  element1 = true;
  element2 = true;
  element3 = true;

  cambiarContra = new FormGroup({
    newpassword: new FormControl('', Validators.required)
  });

  constructor(public usuarios: UsuariosService, public router: Router, public dialog: MatDialog, private location: Location) { }

  info: any;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'home') {
        localStorage.removeItem('currentUser');
        this.info = null;
        console.log(this.info);
        this.router.navigate(['']);
      }
    });
  }


  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.info = JSON.parse(currentUser);
      console.log(this.info);
    }
  }

  changepassword(): void {
    let password = this.cambiarContra.controls.newpassword.value!;
    let id = this.usuarios.datosusuario.id;

    const changedpassword: Password = {
      "id": id,
      "password": password
    };

    console.log(changedpassword);

    this.usuarios.changepassword(changedpassword).subscribe({
      next: (value: Password) => {
        console.log(value);
        console.log(this.usuarios.datosusuario)
      }
    });
    this.cambiarContra.reset();
  }

  showButton1() {
    this.element1 = false;
  }

  hideButton1() {
    this.element1 = true;
  }

  showButton2() {
    this.element2 = false;
  }

  hideButton2() {
    this.element2 = true;
  }

  showButton3() {
    this.element3 = false;
  }

  hideButton3() {
    this.element3 = true;
  }
} 
