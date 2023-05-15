import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './paginas/registro/registro.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { LoginComponent } from './paginas/login/login.component';
import { RankingComponent } from './paginas/ranking/ranking.component';
import { EntregaComponent } from './paginas/entregas/entrega.component';
import { HistorialComponent } from './paginas/ranking/HistorialEvaluaciones/historial.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ranking/:id/:codigo', component: RankingComponent },
  { path: 'entrega/:id/:id_ranking', component: EntregaComponent },
  { path: 'historial/:id', component: HistorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
