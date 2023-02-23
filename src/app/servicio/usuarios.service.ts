import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { Profesores } from '../models/profesores.model';
import { Alumnos } from '../models/alumnos.model';


@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    readonly URL = "http://127.0.0.1:8000/api/";

    constructor(private _http: HttpClient) { }

    datosusuario: any;

    addAlumnos(alumno: Alumnos) {
        return this._http.post(this.URL + "signup", alumno)
            .pipe(
                filter((response: any) => {
                    let found = false;
                    if (response != null) {
                        found = true;
                    }
                    else {
                        found = false;
                    }
                    this.datosusuario = response;
                    return found;
                }
                ));
    }

    addProfesores(profesor: Profesores) {
        return this._http.post(this.URL + "signup", profesor)
            .pipe(
                filter((response: any) => {
                    let found = false;
                    if (response != null) {
                        found = true;
                    }
                    else {
                        found = false;
                    }
                    this.datosusuario = response;
                    return found;
                }
                ));
    }

    login(login: Login) {
        return this._http.post(this.URL + "login", login)
            .pipe(
                filter((response: any) => {
                    let found = false;
                    if (response != null) {
                        found = true;
                    }
                    else {
                        found = false;
                    }
                    this.datosusuario = response;
                    return found;
                }
                ));
    }

}