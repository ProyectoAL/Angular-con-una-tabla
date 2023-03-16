import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../paginas/perfil/DialogComponent.component';
import { PerfilComponent } from '../paginas/perfil/perfil.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(public dialog: MatDialog, public router: Router) { }

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
  }

}
