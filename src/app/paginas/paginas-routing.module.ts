import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { HomeComponent } from './home/home.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ProfesoresComponent } from './profesores/profesores.component';

// const routes: Routes = [
//   { path: '', component: MainPageComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'alumnos', component: AlumnosComponent },
//   { path: 'profesores', component: ProfesoresComponent }
// ];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})
export class PaginasRoutingModule {
}