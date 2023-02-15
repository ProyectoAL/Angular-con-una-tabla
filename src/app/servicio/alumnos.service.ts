import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumnos } from '../models/alumnos.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  readonly URL = "http://127.0.0.1:8000/api/";

  constructor(private _http: HttpClient) { }

  getAlumnos() {
    return this._http.get<Alumnos[]>(this.URL + "showstuden")
      .pipe(
        map((response: any) => {
          if (response.status == 1) {
            return response.roleshow;
          }
          else {
            return [];
          }
        }
        ));
  }

  addAlumnos(alumno: Alumnos) {
    return this._http.post(this.URL + "registers", alumno)
      .pipe(
        map((response: any) => {
          if (response.status == 1) {
            return response.roleshow;
            console.log(response)
          }
          else {
            return [];
          }
        }
        ));
  }


}
