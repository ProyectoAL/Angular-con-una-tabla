import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesores } from '../models/profesores.model';
import { filter } from 'rxjs/operators';
import { Login } from '../models/login.model';

@Injectable({
    providedIn: 'root'
})
export class ProfesorService {

    readonly URL = "http://127.0.0.1:8000/api/";

    constructor(private _http: HttpClient) { }

    datosprofesor: any;

    getProfesores() {
        return this._http.get<Profesores[]>(this.URL + "showteacher")
            .pipe(
                filter((response: any) => {
                    let found = false;
                    if (response != null) {
                        found = true;
                    }
                    else {
                        found = true;
                    }
                    this.datosprofesor = response;
                    return found;
                }
                ));
    }

    addProfesores(profesor: Profesores) {
        return this._http.post(this.URL + "registert", profesor)
            .pipe(
                filter((response: any) => {
                    let found = false;
                    if (response != null) {
                        found = true;
                    }
                    else {
                        found = true;
                    }
                    this.datosprofesor = response;
                    return found;
                }
                ));
    }

    login(login: Login) {
        return this._http.post(this.URL + "logint", login)
            .pipe(
                filter((response: any) => {
                    let found = false;
                    if (response != null) {
                        found = true;
                    }
                    else {
                        found = true;
                    }
                    this.datosprofesor = response;
                    return found;
                }
                ));
    }

}