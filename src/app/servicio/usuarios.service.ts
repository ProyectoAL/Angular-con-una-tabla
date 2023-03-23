import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { filter, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Login } from '../models/login.model';
import { Profesores } from '../models/profesores.model';
import { Alumnos } from '../models/alumnos.model';
import { Password } from '../models/password.model';
import { Photo } from '../models/photo.model';
import { Rankings } from '../models/rankings.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    readonly URL = "http://127.0.0.1:8000/api/";

    httpOptions: any;

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


                    this.httpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
                        })
                    };

                    return this.datosusuario;
                }
                ));
    }

    Rankings(ranking: Rankings) {
        return this._http.post(this.URL + "login", ranking)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }

                    this.datosusuario = response;

                    localStorage.setItem('currentUser', JSON.stringify(this.datosusuario));


                    this.httpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
                        })
                    };

                    return this.datosusuario;
                }
                ));
    }

    changephoto(photo: Photo) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        console.log(this.httpOptions);

        const id = JSON.parse(localStorage.getItem('currentUser') || '').value.id;

        return this._http.put(this.URL + `updatePhoto/${id}`, photo, this.httpOptions)
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

    changepassword(password: Password) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        console.log(this.httpOptions);

        const id = JSON.parse(localStorage.getItem('currentUser') || '').value.id;

        return this._http.put(this.URL + `updatePassword/${id}`, password, this.httpOptions)
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
