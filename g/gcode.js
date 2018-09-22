window.addEventListener("DOMContentLoaded", startGame);

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");


function Game() {

	this.player = new G.Quadratic(20, 180, 10, 10);
	this.jumping = false;
	this.rising = false;
	this.upBoundry = this.player.position.y - 100;
	this.downBoundry = 180;
	this.jumpCount = 0;
	this.jumpVelocity = - 0.1;
	this.jumpNitro = 0;
	this.nitroDeduction = 0;

	G.debug(this.player);

	/*******************************************************************************
	    GAME METHODS DECLARATION
	**********************************************************************************/

    //jump function
	this.jump = function() {

		if (this.jumping) {
			return;
		}

		this.jumping = true;
		this.rising  = true;
		//this.jumpNitro = -2;
	}

    //chect player in every frame to process jumping in jumping in true
	this.checkJump = function() {

		if (!this.jumping) return;	

	    if (this.player.position.y <= this.upBoundry) {
	    	this.jumpVelocity *= -1;
			this.rising = false;
			//this.jumpNitro *= -1; 

	    } else if ( (this.player.position.y > this.downBoundry) && this.jumping) {
	    	this.jumping = false;
	    	this.rising  = false; 
	    	this.jumpVelocity *= -1; 
	    	//this.jumpNitro = 0; 
	    	this.player.position.y = this.downBoundry;
	    } 

	    if (this.jumping)  {
	    	this.player.position.y += (this.jumpVelocity);
	    }
    
	}.bind(this);


	this.moveFoward = function() {
		this.player.position.x += 0.5;
	}.bind(this);


	this.moveBack   = function() {
		this.player.position.x -= 0.5;
	}.bind(this);

    //updates game state every frame
	this.update = function() {
	    this.checkJump();
    }

    //draws game state after every update
	this.draw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.player.draw(context);
	}

    //game loop
	this.loop = function() {
		this.update();
		this.draw();
		//window.requestAnimationFrame(this.loop);
		setTimeout(function() { this.loop(); }.bind(this), 60 / 1000);
	}.bind(this);




	/*******************************************************************************
	    GAME INITIALISATION 
	**********************************************************************************/
	window.addEventListener("keydown", function(e) {
		var keyChar = String.fromCharCode(e.which).toUpperCase();

	    switch(keyChar) {
	    	case 'W':
	            this.jump();
	    	    break;

	    	case 'D':
	    	    this.moveFoward();
	    	    break;

	    	case 'A':
	    	    this.moveBack();
	    	    break;

	    	default:
	    	    return;
	    	    break;
	    }

	    switch(e.which) {
            case 37:
                this.modeBack();
                break;
            case 38:
                this.jump();
                break;

            case 39:
                this.moveFoward();
                break;


            default:
                break;
	    }

	}.bind(this));

	window.addEventListener("keyup", function(e) {
		var keyChar = String.fromCharCode(e.which).toUpperCase();

	    switch(keyChar) {
	    	case 'W':
	    	    break;

	    	case 'A':
	    	    break;
	    	default:
	    	    return;
	    	    break;
	    }
	}.bind(this));


    // intialisae game loop with requestAnimationFrame
	this.loop();
}

var game;
function startGame() {
	game = new Game();
}
