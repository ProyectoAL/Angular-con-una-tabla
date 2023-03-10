import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { filter, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Login } from '../models/login.model';
import { Profesores } from '../models/profesores.model';
import { Alumnos } from '../models/alumnos.model';
import { Password } from '../models/password.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    readonly URL = "http://127.0.0.1:8000/api/";
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '')[1]}`
        })
    };

    constructor(private _http: HttpClient) { }

    datosusuario: any;
    found = false;

    addAlumnos(alumno: Alumnos) {
        return this._http.post(this.URL + "signup", alumno)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    }
                    else {
                        this.found = false;
                    }
                    this.datosusuario = response;
                    return this.datosusuario;
                }
                ));
    }

    addProfesores(profesor: Profesores) {
        return this._http.post(this.URL + "signup", profesor)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    }
                    else {
                        this.found = false;
                    }
                    this.datosusuario = response;
                    return this.datosusuario;
                }
                ));
    }

    login(login: Login) {
        return this._http.post(this.URL + "login", login)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }
                    this.datosusuario = response;

                    localStorage.setItem('currentUser', JSON.stringify(this.datosusuario));

                    return this.datosusuario;
                }
                ));
    }

    changepassword(password: Password) {
        const id = JSON.parse(localStorage.getItem('currentUser') || '')[0].id;
        return this._http.put(this.URL + `update/${id}`, password, this.httpOptions)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        // Si la respuesta es 401, el usuario no está autenticado, por lo que se redirige a la página de inicio de sesión
                        console.log("Esta mal");
                    }
                    return throwError(error);
                }),
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }
                    this.datosusuario = response;

                    return this.datosusuario;
                }
                ));
    }
}
