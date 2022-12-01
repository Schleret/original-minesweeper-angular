import { Casket } from "./casket";

export class Field {

  fields: number[] = [];
  size: number = 81;
  bombs: number[] = [];
  littlecasket: Casket[] = [];
  neighbors: number | null = null;
  assumedbombs: number[] = [];
  lost: boolean;
  showbombs: number = 0;
  bombcaskets: Casket[];
  discask: number[] = [];
  now: number = 0;
  won: boolean = false;
  private columns: number = 9;
  private t: NodeJS.Timeout | null = null;


  constructor(quantitycaskets: number, quantitybombs: number, quantitycolumns: number) {

    this.columns = quantitycolumns;
    this.fields = [];
    for (let i = 0; i < quantitycaskets; i++) {
      this.fields.push(i);
      this.littlecasket.push(new Casket(i));
    }

    this.bombs = [];
    let onebomb: number | null = null;
    let i: number = 0;
    do {
      onebomb = Math.floor(Math.random() * (quantitycaskets - 1) + 1);
      if (this.bombs.indexOf(onebomb) === -1) {
        this.bombs.push(onebomb);
        i += 1;
      }
    } while (
      i < quantitybombs
    )

    this.bombcaskets = []
    for (i = 0; i < this.littlecasket.length; i++) {
      if (this.bombs.indexOf(this.littlecasket[i].counter) !== -1) {
        this.bombcaskets.push(this.littlecasket[i]);
      }
    }

    this.showbombs = this.bombs.length;
    this.lost = false;
    this.size = quantitycaskets;

  }


  timing() {
    this.now += 1;
  }
  timestop() {
    if (this.t !== null) {
      clearInterval(this.t)
    }
  }


  discover(cell: number) {
    if (cell > this.size - 1 || cell < 0) {
      return;
    }
    if (this.won || this.lost || this.littlecasket[cell].klick || this.littlecasket[cell].rightklick) {
      return;
    }
    if (this.discask.length + this.assumedbombs.length == this.littlecasket.length - 1 && this.assumedbombs.length === this.bombcaskets.length) {
      this.won = true;
      this.timestop();
    }
    if (this.discask.length == 0) {
      this.t = setInterval(this.timing.bind(this), 1000);;
    }

    if (this.bombs.indexOf(cell) !== -1) {
      this.lost = true;
      this.timestop();

      for (let i = 0; i < this.bombcaskets.length; i++) {
        this.bombcaskets[i].isbomb = true;
      }
      return;
    }

    this.discask.push(cell);
    this.littlecasket[cell].klick = !this.littlecasket[cell].klick;

    let firstrow: boolean = cell <= this.columns - 1;
    let lastrow: boolean = cell >= this.size - (this.columns - 1);
    let first: boolean = cell % this.columns == 0;
    let last: boolean = cell % this.columns == this.columns - 1;
    let sqrts: boolean = cell <= this.columns;

    this.neighbors = 0;

    if (this.bombs.indexOf(cell - 1) !== -1 && !first) {
      this.neighbors += 1;
    }
    if (this.bombs.indexOf(cell + 1) !== -1 && !last) {
      this.neighbors += 1;
    }
    if (this.bombs.indexOf(cell - (this.columns - 1)) !== -1 && !last && !firstrow) {
      this.neighbors += 1;
    }
    if (this.bombs.indexOf(cell - this.columns) !== -1 && !firstrow) {
      this.neighbors += 1;
    }
    if (this.bombs.indexOf(cell - (this.columns + 1)) !== -1 && !first && !sqrts) {
      this.neighbors += 1;
    }
    if (this.bombs.indexOf(cell + (this.columns - 1)) !== -1 && !first && !lastrow) {
      this.neighbors += 1;
    }
    if (this.bombs.indexOf(cell + this.columns) !== -1 && !lastrow) {
      this.neighbors += 1;
    }
    if (this.bombs.indexOf(cell + (this.columns + 1)) !== -1 && !last && !lastrow) {
      this.neighbors += 1;
    }
    if (this.neighbors !== 0) {
      this.littlecasket[cell].neighborbombs = this.neighbors;
    }

    else {
      if (!first) {
        this.discover(cell - 1);
        if (!lastrow) {
          this.discover(cell + (this.columns - 1))
        }
        if (!sqrts) {
          this.discover(cell - (this.columns + 1))
        }

      }
      if (!last) {
        this.discover(cell + 1);
        if (!firstrow) {
          this.discover(cell - (this.columns - 1));
        }
        if (!lastrow) {
          this.discover(cell + (this.columns + 1));
        }

      }
      if (!firstrow) {
        this.discover(cell - (this.columns));
      }
      if (!lastrow) {
        this.discover(cell + (this.columns));
      }
    }
  }

  markbomb(cell: number) {
    if (!this.littlecasket[cell].klick && !this.littlecasket[cell].rightklick) {
      if (this.assumedbombs.sort(function (a, b) { return a - b }) === this.bombs.sort(function (a, b) { return a - b }) || this.lost) {
        return;
      }
      if (this.discask.length + this.assumedbombs.length == this.littlecasket.length - 1) {
        this.won = true;
        this.timestop();
      }
      this.assumedbombs.push(this.littlecasket[cell].counter);
      this.littlecasket[cell].rightklick = !this.littlecasket[cell].rightklick;
      this.showbombs -= 1;
      return false;
    }
    else {
      if (this.littlecasket[cell].rightklick) {
        this.assumedbombs.pop();
        this.littlecasket[cell].rightklick = !this.littlecasket[cell].rightklick;
        this.showbombs += 1
      }
      return false;
    }
  }




}