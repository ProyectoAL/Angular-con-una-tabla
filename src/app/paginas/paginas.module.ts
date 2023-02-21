import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasRoutingModule } from './paginas-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    HomeComponent,
    UsuariosComponent],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
})
export class PaginasModule {
}
