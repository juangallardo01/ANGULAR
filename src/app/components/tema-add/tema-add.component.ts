import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';
import { Tema } from 'src/app/models/tema.model';
import { TemasService } from 'src/app/services/tema.service';

@Component({
  selector: 'app-tema-add',
  templateUrl: './tema-add.component.html',
  styleUrls: ['./tema-add.component.css']
})
export class TemaAddComponent implements OnInit {
  tema: Tema = {
    nombre: '',
    duracion: 1
  };
  submitted = false;
  
  temas?: Tema[];

  constructor(
    private temaService: TemasService,
    private materialService: MaterialService,
  ) {}


  ngOnInit(): void {
    this.retrieveTemas();

  }

  saveTema(): void {
    const data = {
      id: this.tema.id,
      nombre: this.tema.nombre,
      duracion: this.tema.duracion
    };
    this.temaService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  newTema(): void {
    this.submitted = false;
    this.tema = <Tema>{
      nombre: '',
      duracion: 1
    };
  }

  retrieveTemas(): void {
    this.temaService.getAll()
      .subscribe({
        next: (data) => {
          this.temas = data;
          console.log(this.temas);
        },
        error: (e) => console.error(e)
      });
  }

  




}

