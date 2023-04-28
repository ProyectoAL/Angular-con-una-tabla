import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginasModule } from './paginas/paginas.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { RankingComponent } from './paginas/ranking/ranking.component';
import { DialogComponent } from './paginas/ranking/CrearPractica/DialogComponent.component';
import { EntregaComponent } from './paginas/entregas/entrega.component';
import { CrearRankingComponent } from './paginas/perfil/crearRanking/CrearRanking.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RankingComponent,
    DialogComponent,
    EntregaComponent,
    CrearRankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginasModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],

  providers: [{
    provide: LocationStrategy, useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
