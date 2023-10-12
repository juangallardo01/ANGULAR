import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';
import { Tema } from 'src/app/models/tema.model';
import { TemasService } from 'src/app/services/tema.service';

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {
  curso: Curso = {
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1, // Campo obligatorio
    tema: {
      id: 2 // Campo obligatorio
    }
  };
  submitted = false;



  selectedMaterialId: number = 0;
  dateError: boolean = false;
  temasCursos: any[] = [];
  materiales?: Material[];
  temas?: Tema[];

  constructor(
    private cursoService: CursoService,
    private materialService: MaterialService,
    private temaService: TemasService 
  ) {}

  materialesTema: Material[] = [];
  materialesFiltrados?: Material[] = [];
  selectedTemaId: number = 0;

  ngOnInit(): void {
    this.retrieveMateriales();
    this.retrieveTema();
    this.retrieveMaterialesPorCurso();

    this.cursoService.getTemasDeCurso().subscribe(
      (temas) => {
        this.temasCursos = temas;
      },
      (error) => {
        console.error('Error al obtener temas de cursos:', error);
      }
    );
  }

  saveCurso(): void {
    const data = {
      id: this.curso.id,
      nombre: this.curso.nombre,
      fechaInicio: this.curso.fechaInicio,
      idDocente: this.curso.idDocente,
      tema: this.curso.tema,
    };
    this.cursoService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  newCurso(): void {
    this.submitted = false;
    this.curso = <Curso>{
      nombre: '',
      fechaInicio: new Date(),
      idDocente: 1, // Campo obligatorio
      tema: {
        id: 2 // Campo obligatorio
      }
    };
  }

  retrieveMateriales(): void {
    this.materialService.getAll().subscribe({
      next: (data: any) => {
        this.materiales = data;
        console.log(this.materiales);
      },
      error: (e: any) => console.error(e)
    });
  }

  retrieveTema(): void {
    this.temaService.getAll().subscribe({
      next: (data: any) => {
        this.temas = data;
        console.log(this.temas);
      },
      error: (e: any) => console.error(e)
    });
  }

  retrieveMaterialesPorCurso(): void {
  if (this.selectedTemaId > 0) {
    this.materialService.obtenerMaterialesPorIdCurso(this.selectedTemaId).subscribe({
      next: (data: Material[]) => { // Asegúrate de especificar el tipo de dato correcto
        this.materialesTema = data;
        console.log(this.materialesTema);
        console.log("Materiales recuperados:", this.materialesTema);
      },
      error: (e: any) => console.error("Materiales no recuperados")
    });
  } else {
    console.error("selectedTemaId no es válido. No se realizará la llamada a retrieveMaterialesPorCurso.");
  }
}


}
