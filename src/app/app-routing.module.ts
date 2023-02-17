import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './paginas/alumnos/alumnos.component';
import { HomeComponent } from './paginas/home/home.component';
import { MainPageComponent } from './paginas/main-page/main-page.component';
import { ProfesoresComponent } from './paginas/profesores/profesores.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'profesores', component: ProfesoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
