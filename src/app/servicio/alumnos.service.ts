import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumnos } from '../models/alumnos.model';
import { filter } from 'rxjs/operators';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  readonly URL = "http://127.0.0.1:8000/api/";

  constructor(private _http: HttpClient) { }

  datosalumno: any;

  getAlumnos() {
    return this._http.get<Alumnos[]>(this.URL + "showstuden")
      .pipe(
        filter((response: any) => {
          let found = false;
          if (response != null) {
            found = true;
          }
          else {
            found = true;
          }
          this.datosalumno = response;
          return found;
        }
        ));
  }

  addAlumnos(alumno: Alumnos) {
    return this._http.post(this.URL + "registers", alumno)
      .pipe(
        filter((response: any) => {
          let found = false;
          if (response != null) {
            found = true;
          }
          else {
            found = true;
          }
          this.datosalumno = response;
          return found;
        }
        ));
  }

  login(login: Login) {
    return this._http.post(this.URL + "logins", login)
      .pipe(
        filter((response: any) => {
          let found = false;
          if (response != null) {
            found = true;
          }
          else {
            found = true;
          }
          this.datosalumno = response;
          return found;
        }
        ));
  }

}
