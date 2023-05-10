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
import { CrearPracticas } from '../models/Crearpracticas.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    readonly URL = "http://127.0.0.1:8000/api/";

    httpOptions: any;
    codigoRanking: any;
    datosusuario: any;
    datospracticas: any;
    idProfesor: any;
    nombre: any;
    idPractica: any;
    nombrePractica: any;
    idAlumno: any;
    nombreAlumno: any;
    apellidosAlumno: any;
    idRanking: any;
    idEntrega: any;
    nombreSoftSkill: any;
    niveles: any;
    medalla1: any;
    medalla2: any;
    medalla3: any;
    medalla4: any;
    medalla5: any;

    found = false;

    constructor(private _http: HttpClient) { }

    setCodigoRanking(codigo: any) {
        this.codigoRanking = codigo;
    }

    setNombreRanking(nombre: any) {
        this.nombre = nombre;
    }

    setIdProfesor(id: any) {
        this.idProfesor = id;
    }

    setIdPractica(id: any) {
        this.idPractica = id;
    }

    setNombrePractica(nombre: any) {
        this.nombrePractica = nombre;
    }

    setIdAlumno(id: any) {
        this.idAlumno = id;
    }

    setNombreAlumno(nombre: any) {
        this.nombreAlumno = nombre;
    }

    setApellidosAlumno(apellidos: any) {
        this.apellidosAlumno = apellidos;
    }

    setIdRanking(id: any) {
        this.idRanking = id;
    }

    setIdEntrega(id: any) {
        this.idEntrega = id;
    }

    setNombreSoftSkill(nombre: any) {
        this.nombreSoftSkill = nombre;
    }


    getCodigoRanking() {
        return this.codigoRanking;
    }

    getNombreRanking() {
        return this.nombre;
    }

    getIdProfesor() {
        return this.idProfesor;
    }

    getIdPractica() {
        return this.idPractica;
    }

    getNombrePractica() {
        return this.nombrePractica;
    }

    getIdAlumno() {
        return this.idAlumno;
    }

    getNombreAlumno() {
        return this.nombreAlumno;
    }

    getIdRanking() {
        return this.idRanking;
    }

    getIdEntrega() {
        return this.idEntrega;
    }

    getApellidosAlumno() {
        return this.apellidosAlumno;
    }

    getNombreSoftSkill() {
        return this.nombreSoftSkill;
    }

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
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        const id = JSON.parse(localStorage.getItem('currentUser') || '').value.id;

        console.log(this.URL + `unitedranking/${ranking.id_usuario}, ${ranking.codigo}`);

        return this._http.post(this.URL + `unitedranking/${ranking.id_usuario}, ${ranking.codigo}`, ranking, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }

                    this.datosusuario = response;

                    localStorage.setItem('ranking', JSON.stringify(this.datosusuario));

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

    CreatePracticas(practica: CrearPracticas) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        return this._http.post(this.URL + 'createp', practica, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }

                    return this.datosusuario;
                }
                ));
    }

    Medalla1(puntos: number) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        console.log(puntos);

        return this._http.get(this.URL + `selectResponsabilidad/${puntos}`, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }
                    this.medalla1 = response;
                    return this.medalla1;
                }
                ));
    }

    Medalla2(puntos: number) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        console.log(puntos);

        return this._http.get(this.URL + `selectCooperacion/${puntos}`, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }
                    this.medalla2 = response;
                    return this.medalla2;
                }
                ));
    }

    Medalla3(puntos: number) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        console.log(puntos);

        return this._http.get(this.URL + `selectAutonomia_e_iniciativa/${puntos}`, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }
                    this.medalla3 = response;
                    return this.medalla3;
                }
                ));
    }

    Medalla4(puntos: number) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        console.log(puntos);

        return this._http.get(this.URL + `selectGestion_emocional/${puntos}`, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }
                    this.medalla4 = response;
                    return this.medalla4;
                }
                ));
    }

    Medalla5(puntos: number) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };

        console.log(puntos);

        return this._http.get(this.URL + `selectHabilidades_de_pensamiento/${puntos}`, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }
                    this.medalla5 = response;
                    return this.medalla5;
                }
                ));
    }

}
