import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/models/tema.model';
import { TemasService } from 'src/app/services/tema.service';


@Component({
  selector: 'app-curso-list',
  templateUrl: './tema-list.component.html',
  styleUrls: ['./tema-list.component.css']
})
export class TemaListComponent implements OnInit {
  temas?: Tema[];
  currentElement: Tema = {};
  currentIndex = -1;
  title = '';

  constructor(private temaService: TemasService) { }
  ngOnInit(): void {
    this.retrieveTemas();
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
  refreshList(): void {
    this.retrieveTemas();
    this.currentElement = {};
    this.currentIndex = -1;
  }
  setActiveElement(element: Tema, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
  removeAllElements(): void {
    this.temaService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
 searchTitle(): void {
  this.currentIndex = -1;
  this.temaService.findByTitle(this.title)
    .subscribe({
      next: (data) => {
        this.temas = data as Tema[]; // Actualiza la lista de cursos con el resultado de la búsqueda
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
 
}
