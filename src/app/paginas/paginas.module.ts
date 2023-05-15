import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasRoutingModule } from './paginas-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { UpdateRankingComponent } from './perfil/ActualizarRanking/UpdateRanking.component';
import { EditarPuntuacionComponent } from './entregas/EditarPuntuación/EditarPuntuacion.component';
import { SoftSkillsComponent } from './ranking/SoftSkills/SoftSkillsComponent.component';
import { RepartirComponent } from './ranking/RepartirPuntos/RepartirComponent.component';
import { HistorialComponent } from './ranking/HistorialEvaluaciones/historial.component';

@NgModule({
  declarations: [
    PerfilComponent,
    RegistroComponent,
    UpdateRankingComponent,
    EditarPuntuacionComponent,
    SoftSkillsComponent,
    RepartirComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
})
export class PaginasModule {
}
