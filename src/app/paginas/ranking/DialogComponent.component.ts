// Imports.
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrearPracticas } from 'src/app/models/Crearpracticas.model';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './DialogComponent.component.html',
  styleUrls: ['./DialogComponent.component.css']
})

export class DialogComponent {

  // Variable donde se guardara el token de acceso.
  httpOptions: any;

  // Constructor.
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usuarios: UsuariosService) { }

  // FormGroup para los inputs nombre, descripcion, puntuacion.
  nombrePractica = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    puntuacion: new FormControl('', Validators.required)
  });

  // Funcion para guardar la información necesaria para la creación de las practicas al modelo CrearPracticas.
  CrearPractica(): void {

    // Insertamos la infromación de getIdProfesor y de getCodigoRanking a unas nuevas variables.
    let id_profesor = this.usuarios.getIdProfesor();
    let codigo = this.usuarios.getCodigoRanking();
    // Insertamos la información del Formgroup en unas nuevas variables.
    let nombre = this.nombrePractica.controls.nombre.value!;
    let descripcion = this.nombrePractica.controls.descripcion.value!;
    let puntuacion = this.nombrePractica.controls.puntuacion.value!;

    // Insertamos la información de las variables anteriores en las variables del modelo "CrearPracticas".
    const practica: CrearPracticas = {
      "id_profesor": id_profesor,
      "codigo": codigo,
      "nombre": nombre,
      "descripcion": descripcion,
      "puntuacion": puntuacion
    };

    // Mostrar por consola el contenido del modelo..
    console.log(practica);

    // Para cerrar la pestaña una vez se haya terminado el codigo anterior
    this.dialogRef.close('back');

    //Linea de comandos para enviar la información a la funciond el service 
    //si la comprobacion de la contaseña es correcta.
    this.usuarios.CreatePracticas(practica).subscribe({
      next: (value: CrearPracticas) => {
        console.log(value);
      }
    });
    // Comando para borrar el contenido de los inputs del formulario.
    this.nombrePractica.reset();

  }

  // Funcion para cerrar la pestaña
  onBackClick(): void {

    // Para cerrar la pestaña
    this.dialogRef.close('back');
  }
}