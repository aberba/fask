window.addEventListener("DOMContentLoaded", startGame);

var canvas1 = document.querySelector("canvas");
var context = canvas.getContext("2d");

var box = G.Quadiratic(20, 20, 10,10);
box.color = "red";


function update() {
    box.posotion.x += 1;
}

function draw() {
	box.draw(context);
}

function loop() {
	update();
	draw();
}

window.requestAnimationFrame(loop);