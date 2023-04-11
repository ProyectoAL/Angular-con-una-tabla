import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../perfil/DialogComponent.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { UsuariosService } from '../../servicio/usuarios.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  httpOptions: any;

  datos: any[] = [];

  info: any;

  contenido: any;

  parametro: any;

  constructor(public usuarios: UsuariosService, public dialog: MatDialog, public router: Router, private _http: HttpClient) { }

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
      this.info = JSON.parse(currentUser).value;
      console.log(this.info);
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    this.parametro = this.usuarios.getParametro();

    console.log(this.parametro);

    this._http.post(this.usuarios.URL + `indexall/${this.parametro}`, this.parametro, this.httpOptions).subscribe((data: any) => {
      this.datos = data;
      console.log(this.datos);
    });
  }

}
