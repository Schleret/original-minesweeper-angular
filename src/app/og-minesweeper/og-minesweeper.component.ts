import { Component, OnInit } from '@angular/core';
import { Casket } from './casket';
import { Field } from './field';

@Component({
  selector: 'app-og-minesweeper',
  templateUrl: './og-minesweeper.component.html',
  styleUrls: ['./og-minesweeper.component.scss']
})
export class OgMinesweeperComponent implements OnInit {
  field: Field = new Field(81, 10, 9);
  casket: Casket = new Casket(0);
  beginner: number[] = [81, 10, 9];
  intermediate: number[] = [256, 40, 16];
  pro: number[] = [480, 99, 30]



  constructor() {

  }

  ngOnInit(): void {

  }
  

  sizing(sizearray: number[]): void {
    this.field = new Field(sizearray[0], sizearray[1], sizearray[2]);
  }


  resizing(): void {
    if (this.field.bombs.length == 10) {
      this.sizing(this.beginner);
      return;
    }
    if (this.field.bombs.length == 40) {
      this.sizing(this.intermediate)
      return;
    }
    if (this.field.bombs.length == 99) {
      this.sizing(this.pro)
      return;
    }
  }




}
