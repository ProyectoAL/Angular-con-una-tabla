import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesores } from '../models/profesores.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfesorService {

    readonly URL = "http://127.0.0.1:8000/api/";

    constructor(private _http: HttpClient) { }

    getProfesores() {
        return this._http.get<Profesores[]>(this.URL + "showteacher")
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

    addProfesores(profesor: Profesores) {
        return this._http.post(this.URL + "registert", profesor)
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