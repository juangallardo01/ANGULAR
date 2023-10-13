import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { TemaListComponent } from './components/tema-list/tema-list.component';
import { TemaAddComponent } from './components/tema-add/tema-add.component';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { AlumnoAddComponent } from './components/alumno-add/alumno-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CursoAddComponent,
    CursoListComponent,
    CursoDetailsComponent,
    TemaListComponent,
    TemaAddComponent,
    AlumnoListComponent,
    AlumnoAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

