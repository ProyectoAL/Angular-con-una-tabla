import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { Registro } from '../models/registro.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    readonly URL = "http://127.0.0.1:8000/api/";

    constructor(private _http: HttpClient) { }

    datosusuario: any;

    getUsuarios() {
        return this._http.get<Registro[]>(this.URL + "showteacher")
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

    addUsuarios(registro: Registro) {
        return this._http.post(this.URL + "registert", registro)
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
        return this._http.post(this.URL + "logint", login)
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