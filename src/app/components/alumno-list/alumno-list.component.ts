import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';


@Component({
  selector: 'app-curso-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {
  alumnos?: Alumno[];
  currentElement: Alumno = {};
  currentIndex = -1;
  title = '';

  constructor(private alumnoService: AlumnoService) { }
  ngOnInit(): void {
    this.retrieveAlumnos();
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
  refreshList(): void {
    this.retrieveAlumnos();
    this.currentElement = {};
    this.currentIndex = -1;
  }
  setActiveElement(element: Alumno, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
  removeAllElements(): void {
    this.alumnoService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

 
}

