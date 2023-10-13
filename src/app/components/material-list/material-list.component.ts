import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';


@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
  materiales?: Material[];
  currentElement: Material = {};
  currentIndex = -1;
  title = '';

  constructor(private materialService: MaterialService) { }
  ngOnInit(): void {
    this.retrieveMateriales();
  }
  
  retrieveMateriales(): void {
    this.materialService.getAll()
      .subscribe({
        next: (data) => {
          this.materiales = data;
          console.log(this.materiales);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveMateriales();
    this.currentElement = {};
    this.currentIndex = -1;
  }
  setActiveElement(element: Material, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
  removeAllElements(): void {
    this.materialService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
 
 
}
