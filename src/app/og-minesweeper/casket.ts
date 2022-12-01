


export class Casket {
counter: number;
klick: boolean;
rightklick: boolean;
isbomb: boolean;
neighborbombs: number | null = null;

constructor(casketcounter: number){
this.counter=casketcounter;
this.klick=false;
this.rightklick=false;
this.isbomb=false;
}


}