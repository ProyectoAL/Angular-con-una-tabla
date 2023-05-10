// Imports.
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-SoftSkills',
  templateUrl: './SoftSkillsComponent.component.html',
  styleUrls: ['./SoftSkillsComponent.component.css']
})

export class SoftSkillsComponent {

  // Variable donde se guardara el token de acceso.
  httpOptions: any;

  nombre: any;

  // Constructor.
  constructor(public dialogRef: MatDialogRef<SoftSkillsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usuarios: UsuariosService) { }


  ngOnInit(): void {
    this.nombre = this.usuarios.getNombreSoftSkill();
  }


  // Funcion para cerrar la pestaña
  onBackClick(): void {

    // Para cerrar la pestaña
    this.dialogRef.close('back');
  }
}