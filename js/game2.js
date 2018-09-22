"use strict";
var Game;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || 
                               window.oRequestAnimationFrame || 
                               function(callback) {
                                  window.setInterval(callback, 1000 / 60);
                               };

function startGame() {

	var canvas  = document.querySelector("#canvas");
	var context = canvas.getContext("2d");

	Game = {
		canvas: canvas,
		canvasContext: context,
		canvasWidth: 500,
		canvasHeight: 300,
	};

	Game.canvas.width  = Game.canvasWidth;
	Game.canvas.height = Game.canvasHeight;

	G.loadImage("toy", "img/toy.png");

	Game.player          = new G.Sprite(G._images["toy"], 0, 0, 10, 10);
	Game.player.colour   = new G.Colour(255, 0, 0, 1);
	Game.player.velocity = new G.Vector2(1, 1);


	Game.update = function() {
		
		if (Game.player.position.x > Game.canvasWidth || Game.player.position.x < 0) {
			Game.player.velocity.x *= -1;
		}

		if (Game.player.position.y > Game.canvasHeight || Game.player.position.y < 0) {
			Game.player.velocity.y *= -1;
		}

		Game.player.position.x += Game.player.velocity.x;
		Game.player.position.y += Game.player.velocity.y;
	}

	Game.draw = function() {
		Game.canvasContext.clearRect(0, 0, Game.canvasWidth, Game.canvasHeight);
		Game.player.draw(Game.canvasContext);
	}

	Game.gameloop = function() {
		Game.update();
		Game.draw();
	}

	window.setInterval(function() { Game.gameloop(); }, 1000 / 60);
	//window.requestAnimationFrame( Game.gameloop );
}

window.addEventListener("DOMContentLoaded" ,startGame);
