var canvas60 = document.getElementById('canvas60');
var canvas30 = document.getElementById('canvas30');
var canvas10 = document.getElementById('canvas10');
var ctx60 = canvas60.getContext('2d');
var ctx30 = canvas30.getContext('2d');
var ctx10 = canvas10.getContext('2d');

var canvasWidth = canvas60.width;
var canvasHeight = canvas60.height;

ctx30.fillStyle = '#0000DD';
ctx10.fillStyle = '#DD0000';

var square60 = new Square(ctx60);
var square30 = new Square(ctx30);
var square10 = new Square(ctx10);

var counter = 0;
var now60 = 0,
    now30 = 0,
    now10 = 0;
var last60 = timestamp(),
    last30 = timestamp(),
    last10 = timestamp();
var dt60 = 0,
    dt30 = 0,
    dt10 = 0;
var accumulator60 = 0,
    accumulator30 = 0,
    accumulator10 = 0;
var dt = 1000 / 60;

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function Square(ctx) {
    this.x = 50;
    this.y = 50;
    this.dx = 2;
    this.dy = 1;
    this.width = 10;
    this.height = 10;
    this.ctx = ctx;
}

Square.prototype.move = function (dt) {
    this.x += this.dx * dt * 60 / 1000;
    this.y += this.dy * dt * 60 / 1000;

    if (this.x <= 0 || this.x >= canvasWidth - this.width) this.dx = -this.dx;

    if (this.y <= 0 || this.y >= canvasHeight - this.height) this.dy = -this.dy;
}

Square.prototype.draw = function () {
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

var animate = (function () {
    return function (callback, element) {
        if (counter % 2 === 0) {
            animate30();
        }

        if (counter % 10 === 0) {
            animate10();
        }

        counter = ++counter % 60;

        window.setTimeout(callback, 1000 / 60);
    };
})();

function animate60() {
    animate(animate60);

    now60 = timestamp();
    dt60 = now60 - last60;
    last60 = now60;

    accumulator60 += dt60;

    while (accumulator60 >= dt) {
        square60.move(dt);
        accumulator60 -= dt;
    }

    square60.draw();
}

function animate30() {
    now30 = timestamp();
    dt30 = now30 - last30;
    last30 = now30;

    accumulator30 += dt30;

    while (accumulator30 >= dt) {
        square30.move(dt);
        accumulator30 -= dt;
    }

    square30.draw();
}

function animate10() {
    now10 = timestamp();
    dt10 = now10 - last10;
    last10 = now10;

    accumulator10 += dt10;

    while (accumulator10 >= dt) {
        square10.move(dt);
        accumulator10 -= dt;
    }

    square10.draw();
}

animate60();