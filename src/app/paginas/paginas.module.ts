import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasRoutingModule } from './paginas-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { UpdateRankingComponent } from './perfil/ActualizarRanking/UpdateRanking.component';

@NgModule({
  declarations: [
    PerfilComponent,
    RegistroComponent,
    UpdateRankingComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
})
export class PaginasModule {
}
