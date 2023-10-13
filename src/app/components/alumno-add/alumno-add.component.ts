import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumno-add',
  templateUrl: './alumno-add.component.html',
  styleUrls: ['./alumno-add.component.css']
})
export class AlumnoAddComponent implements OnInit {
  alumno: Alumno = {
    nombre: '',
    fechaNacimiento: new Date
  };
  submitted = false;
  
  alumnos?: Alumno[];

  constructor(
    private alumnoService: AlumnoService,
  ) {}


  ngOnInit(): void {
    this.retrieveAlumnos();

  }

  saveAlumno(): void {
    const data = {
      nombre: this.alumno.nombre,
      fechaNacimiento: this.alumno.fechaNacimiento
    };
    this.alumnoService.create(data).subscribe({
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
    this.alumno = <Alumno>{
      nombre: '',
      fechaNacimiento: new Date
    };
  }

  retrieveAlumnos(): void {
    this.alumnoService.getAll()
      .subscribe({
        next: (data) => {
          this.alumnos = data;
          console.log(this.alumnos);
        },
        error: (e) => console.error(e)
      });
  }

  




}