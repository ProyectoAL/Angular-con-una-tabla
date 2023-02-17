import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/servicio/alumnos.service';
import { ProfesorService } from 'src/app/servicio/profesores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private alumno: AlumnosService, private profesor: ProfesorService) { }

  ngOnInit(): void {
    console.log(this.alumno.datosalumno);
    console.log(this.profesor.datosprofesor);
  }

}
