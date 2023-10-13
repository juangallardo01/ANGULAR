import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { Tema } from 'src/app/models/tema.model'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentElement: Curso = <Curso>{
    title: '',
    status: 'draft',
    content: ''
  };
  
  temaEdit: string = ''; // Variable para editar el tema
  message = '';
  
  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params["id"]);
    }
  }
  
  getElement(id: string): void {
    this.cursoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentElement = data;
          this.temaEdit = data.tema && data.tema.nombre ? data.tema.nombre : ''; // Inicializa temaEdit
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateElement(): void {
    this.message = '';
    if (this.currentElement.tema && typeof this.currentElement.tema === 'object' && 'nombre' in this.currentElement.tema){
    this.currentElement.tema.nombre = this.temaEdit; // Actualiza el valor del tema
    this.cursoService.update(this.currentElement.id, this.currentElement)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Curso actualizado!';
          //this.router.navigate(['/cursos']);
        },
        error: (e) => console.error(e)
      });
    }
  }
  deleteElement(): void {
    this.cursoService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cursos']);
        },
        error: (e) => console.error(e)
      });
  }
}
