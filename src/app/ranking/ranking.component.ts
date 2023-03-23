import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../paginas/perfil/DialogComponent.component';
import { PerfilComponent } from '../paginas/perfil/perfil.component';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  httpOptions: any;

  datos: any[] = [];

  constructor(public usuarios: UsuariosService, public dialog: MatDialog, public router: Router, private _http: HttpClient) { }

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
      this.info = JSON.parse(currentUser).value;
      console.log(this.info);
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    this._http.get(this.usuarios.URL + 'indexm', this.httpOptions).subscribe((data: any) => {
      this.datos = data;
    });
  }

}
