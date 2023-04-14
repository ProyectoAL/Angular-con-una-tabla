import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicio/usuarios.service';
import { DialogComponent } from './DialogComponent.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  httpOptions: any;
  info: any;
  contenido: any;
  codigoRanking: any;
  nombre: any;

  datos: any[] = [];
  datosranking: any[] = [];

  element = true;

  constructor(public usuarios: UsuariosService, public dialog: MatDialog, public router: Router, private _http: HttpClient) { }

  ngOnInit(): void {

    const currentUser = localStorage.getItem('currentUser');

    this.nombre = this.usuarios.getNombreRanking();

    if (currentUser) {
      this.info = JSON.parse(currentUser).value;

      console.log(this.info);

      this.usuarios.setIdProfesor(this.info.id);
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    this.codigoRanking = this.usuarios.getCodigoRanking();

    console.log(this.codigoRanking);

    this._http.post(this.usuarios.URL + `indexall/${this.codigoRanking}`, this.codigoRanking, this.httpOptions).subscribe((data: any) => {
      this.datos = data;
      console.log(this.datos);
    });

  }

  openDialog(): void {

    let dialogRef = this.dialog.open(DialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'home') {
        this.router.navigate(['']);
      }
    });
  }

}
