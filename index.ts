// Oppgave 1
class Circle {
    // private tilsier at variablen kun kan bli brukt inni klassen. _ før variabel tilsier det samme
    private _radius?: number = 1;
    private _color?: string = "red";

    // for at en konstruktør skal være frivellig å bruke, må man bruke ? for å si at det kan være undefined
    constructor(radius?: number, color?: string) {
        // hvis radius er undefined (altså ikke sendt inn), 
        // så beholder man veriden som allerede er satt
        if (radius && radius > 0) this._radius = radius; 
        if (color) this._color = color;
    }

    // get bruker man for å hente ut private variabler
    get radius() { return this._radius; }
    get color() { return this._color; }

    // set bruker man for å endre private variabler
    set radius(value: number | undefined) { this._radius = value; }
    set color(value: string | undefined) { this._color = value; }

    get areal() {  if (this._radius) return (Math.PI * this._radius)**2; }
    get omkrets() { if (this._radius) return 2*Math.PI * this._radius; }
    
    toString() {
        if (this._radius) return `Sirkelen har en radius på  ${this._radius}, et areal på ${this.areal} og en omkrets på ${this.omkrets}`;
        else return "Sirkelen har ingen radius." 
    }
}

class Kube {
    private _side: number;
    private _sirkel: Circle; // går an å bruke klasser som typer

    /**
      her kunne man også utenfor klassen definert en egen type for Cirle.
      type Circle = {
        radius?: number,
        color?: string
      } 
    */

    constructor(side: number, sirkel: Circle) {
        this._side = side;
        this._sirkel = sirkel;
    }
}

const myCircle = new Circle();
const myNewCircle = new Circle(2, "blue");

console.log(myCircle.toString());
console.log(myNewCircle.toString());

const cube = new Kube(2, myNewCircle);


// Oppgave 2

// abstract betyr at man ikke kan oprette en instans av klassen
abstract class Brikke {
    // protected er private varibler som kan bli brukt i klasser
    // som arver fra denne.
    // private variabler kan ikke brukes i de andre klassene.
    protected _name: string = "Brikke";
    private _color: string;
    private _posX: string;
    private _posY: number; 
    private _validX: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
    private _validY: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

    constructor(color: string, posX: string, posY: number) {
        this._color = color;

        // må sjekke om posisjonene som blir sendt er riktige.
        if (this.isValidPosX(posX)) this._posX = posX;
        else throw new Error("Posisjon X (posX) må være en bokstav mellom A - H");

        if (this.isValidPosY(posY)) this._posY = posY;
        else throw new Error("Posisjon Y (posY) må være et tall mellom 1 - 8");
    }

    get color() { return this._color; }
    get posX() { return this._posX; }
    get posY() { return this._posY; }

    isValidPosX(pos: string): boolean {
        for (const letter of this._validX) if (pos.toUpperCase() === letter) return true;
        return false;
    }

    isValidPosY(pos: number): boolean {
        for (const number of this._validY) if (pos === number) return true;
        return false;
    }

    toString() { return `${this._name} (${this._color}) har posisjon ${this._posX}${this._posY}.`; }
}

class Bonde extends Brikke {
    _name = "Bonde";

    constructor(color: string, posX: string, posY: number) {
        super(color, posX, posY);
    }
}

class Konge extends Brikke {
    // her kan man sette _name som var protected i Brikke klassen
    // til noe som passer denne klassen
    _name = "Konge";
    
    constructor(color: string, posX: string, posY: number) {
        // bruker super på de parameterne som skal sendes inn 
        // når man oppretter en instans
        super(color, posX, posY);
    }
}

class Dronning extends Brikke {
    _name = "Dronning";

    constructor(color: string, posX: string, posY: number) {
        super(color, posX, posY);
    }
}

class Tårn extends Brikke {
    _name = "Tårn";

    constructor(color: string, posX: string, posY: number) {
        super(color, posX, posY);
    }
}

class Løper extends Brikke {
    _name = "Løper";

    constructor(color: string, posX: string, posY: number) {
        super(color, posX, posY);
    }
}

class Springer extends Brikke {
    _name = "Springer";

    constructor(color: string, posX: string, posY: number) {
        super(color, posX, posY);
    }
}

const letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
const bønder: Bonde[] = [];
const tårn: Tårn[] = [new Tårn("white", "A", 1), new Tårn("white", "H", 1), new Tårn("black", "H", 8), new Tårn("black", "A", 8)];
const springere: Springer[] = [new Springer("white", "B", 1), new Springer("white", "G", 1), new Springer("black", "B", 8), new Springer("black", "G", 8)]
const løpere: Løper[] = [new Løper("white", "C", 1), new Løper("white", "F", 1), new Løper("black", "F", 8), new Løper("black", "C", 8)];
const konger: Konge[] = [new Konge("white", "E", 1), new Konge("black", "E", 8)];
const dronninger: Dronning[] = [new Dronning("white", "D", 1), new Dronning("black", "D", 8)];


for (let i = 0; i < 8; i++) bønder.push(new Bonde("white", letters[i], 2));
for (let i = 0; i < 8; i++) bønder.push(new Bonde("black", letters[i], 7));

for (const bonde of bønder) console.log(bonde.toString());
for (const t of tårn) console.log(t.toString());
for (const springer of springere) console.log(springer.toString());
for (const løper of løpere) console.log(løper.toString());
for (const konge of konger) console.log(konge.toString());
for (const dronning of dronninger) console.log(dronning.toString());
