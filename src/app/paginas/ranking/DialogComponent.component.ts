import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrearPracticas } from 'src/app/models/Crearpracticas.model';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './DialogComponent.component.html',
  styleUrls: ['./DialogComponent.component.css']
})
export class DialogComponent {

  httpOptions: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public usuarios: UsuariosService, private _http: HttpClient) { }


  nombrePractica = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    puntuacion: new FormControl('', Validators.required)
  });

  CrearPractica(): void {
    // Insertamos la información del Formgroup en unas nuevas variables.

    let id_profesor = this.usuarios.getIdProfesor();
    let codigo = this.usuarios.getCodigoRanking();
    let nombre = this.nombrePractica.controls.nombre.value!;
    let descripcion = this.nombrePractica.controls.descripcion.value!;
    let puntuacion = this.nombrePractica.controls.puntuacion.value!;

    // Insertamos la información de las variables anteriores en las variables del modelo "Registro".
    const practica: CrearPracticas = {
      "id_profesor": id_profesor,
      "codigo": codigo,
      "nombre": nombre,
      "descripcion": descripcion,
      "puntuacion": puntuacion
    };

    this.dialogRef.close('back');

    // Comando para comprobar que la información se guarda en el modelo.
    console.log(practica);

    //Linea de comandos para enviar la información a la funciond el service 
    //si la comprobacion de la contaseña es correcta.
    // this.usuarios.Practicas(practica).subscribe({
    //   next: (value: Practicas) => {
    //     console.log(value);
    //   }
    // });
    // Comando para borrar el contenido de los inputs del formulario.
    // this.nombrePractica.reset();

  }

  onBackClick(): void {
    this.dialogRef.close('back');
  }
}