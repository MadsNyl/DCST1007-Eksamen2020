var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Oppgave 1
var Circle = /** @class */ (function () {
    function Circle(radius, color) {
        this._radius = 1;
        this._color = "red";
        if (radius && radius > 0)
            this._radius = radius;
        if (color)
            this._color = color;
    }
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () { return this._radius; },
        set: function (value) { this._radius = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) { this._color = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "areal", {
        get: function () { if (this._radius)
            return Math.pow((Math.PI * this._radius), 2); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "omkrets", {
        get: function () { if (this._radius)
            return 2 * Math.PI * this._radius; },
        enumerable: false,
        configurable: true
    });
    Circle.prototype.toString = function () {
        if (this._radius)
            return "Sirkelen har en radius p\u00E5  ".concat(this._radius, ", et areal p\u00E5 ").concat(this.areal, " og en omkrets p\u00E5 ").concat(this.omkrets);
        else
            return "Sirkelen har ingen radius.";
    };
    return Circle;
}());
var Kube = /** @class */ (function () {
    function Kube(side, sirkel) {
        this._side = side;
        this._sirkel = sirkel;
    }
    return Kube;
}());
var myCircle = new Circle();
var myNewCircle = new Circle(2, "blue");
console.log(myCircle.toString());
console.log(myNewCircle.toString());
var cube = new Kube(2, myNewCircle);
// Oppgave 2
var Brikke = /** @class */ (function () {
    function Brikke(color, posX, posY) {
        this._name = "Brikke";
        this._validX = ["A", "B", "C", "D", "E", "F", "G", "H"];
        this._validY = [1, 2, 3, 4, 5, 6, 7, 8];
        this._color = color;
        if (this.isValidPosX(posX))
            this._posX = posX;
        else
            throw new Error("Posisjon X (posX) må være en bokstav mellom A - H");
        if (this.isValidPosY(posY))
            this._posY = posY;
        else
            throw new Error("Posisjon Y (posY) må være et tall mellom 1 - 8");
    }
    Object.defineProperty(Brikke.prototype, "color", {
        get: function () { return this._color; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brikke.prototype, "posX", {
        get: function () { return this._posX; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Brikke.prototype, "posY", {
        get: function () { return this._posY; },
        enumerable: false,
        configurable: true
    });
    Brikke.prototype.isValidPosX = function (pos) {
        for (var _i = 0, _a = this._validX; _i < _a.length; _i++) {
            var letter = _a[_i];
            if (pos.toUpperCase() === letter)
                return true;
        }
        return false;
    };
    Brikke.prototype.isValidPosY = function (pos) {
        for (var _i = 0, _a = this._validY; _i < _a.length; _i++) {
            var number = _a[_i];
            if (pos === number)
                return true;
        }
        return false;
    };
    Brikke.prototype.toString = function () { return "".concat(this._name, " (").concat(this._color, ") har posisjon ").concat(this._posX).concat(this._posY, "."); };
    return Brikke;
}());
var Bonde = /** @class */ (function (_super) {
    __extends(Bonde, _super);
    function Bonde(color, posX, posY) {
        var _this = _super.call(this, color, posX, posY) || this;
        _this._name = "Bonde";
        return _this;
    }
    return Bonde;
}(Brikke));
var Konge = /** @class */ (function (_super) {
    __extends(Konge, _super);
    function Konge(color, posX, posY) {
        var _this = _super.call(this, color, posX, posY) || this;
        _this._name = "Konge";
        return _this;
    }
    return Konge;
}(Brikke));
var Dronning = /** @class */ (function (_super) {
    __extends(Dronning, _super);
    function Dronning(color, posX, posY) {
        var _this = _super.call(this, color, posX, posY) || this;
        _this._name = "Dronning";
        return _this;
    }
    return Dronning;
}(Brikke));
var Tårn = /** @class */ (function (_super) {
    __extends(Tårn, _super);
    function Tårn(color, posX, posY) {
        var _this = _super.call(this, color, posX, posY) || this;
        _this._name = "Tårn";
        return _this;
    }
    return Tårn;
}(Brikke));
var Løper = /** @class */ (function (_super) {
    __extends(Løper, _super);
    function Løper(color, posX, posY) {
        var _this = _super.call(this, color, posX, posY) || this;
        _this._name = "Løper";
        return _this;
    }
    return Løper;
}(Brikke));
var Springer = /** @class */ (function (_super) {
    __extends(Springer, _super);
    function Springer(color, posX, posY) {
        var _this = _super.call(this, color, posX, posY) || this;
        _this._name = "Springer";
        return _this;
    }
    return Springer;
}(Brikke));
var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
var bønder = [];
var tårn = [new Tårn("white", "A", 1), new Tårn("white", "H", 1), new Tårn("black", "H", 8), new Tårn("black", "A", 8)];
var springere = [new Springer("white", "B", 1), new Springer("white", "G", 1), new Springer("black", "B", 8), new Springer("black", "G", 8)];
var løpere = [new Løper("white", "C", 1), new Løper("white", "F", 1), new Løper("black", "F", 8), new Løper("black", "C", 8)];
var konger = [new Konge("white", "E", 1), new Konge("black", "E", 8)];
var dronninger = [new Dronning("white", "D", 1), new Dronning("black", "D", 8)];
for (var i = 0; i < 8; i++)
    bønder.push(new Bonde("white", letters[i], 2));
for (var i = 0; i < 8; i++)
    bønder.push(new Bonde("black", letters[i], 7));
for (var _i = 0, bønder_1 = bønder; _i < bønder_1.length; _i++) {
    var bonde = bønder_1[_i];
    console.log(bonde.toString());
}
for (var _a = 0, tårn_1 = tårn; _a < tårn_1.length; _a++) {
    var t = tårn_1[_a];
    console.log(t.toString());
}
for (var _b = 0, springere_1 = springere; _b < springere_1.length; _b++) {
    var springer = springere_1[_b];
    console.log(springer.toString());
}
for (var _c = 0, løpere_1 = løpere; _c < løpere_1.length; _c++) {
    var løper = løpere_1[_c];
    console.log(løper.toString());
}
for (var _d = 0, konger_1 = konger; _d < konger_1.length; _d++) {
    var konge = konger_1[_d];
    console.log(konge.toString());
}
for (var _e = 0, dronninger_1 = dronninger; _e < dronninger_1.length; _e++) {
    var dronning = dronninger_1[_e];
    console.log(dronning.toString());
}
