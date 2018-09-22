(function() {
"use strict";
/*************************************************************
    SPRITE CLASS OBJECTS
    *
*************************************************************/
G.Sprite = function(cacheImage, x, y, _width, _height) {
	G.Sprite = G.extendDeep(this, new G.Entity);
    
    this.position  = new G.Vector2(x, y);
    this._width    = _width;
    this._height   = _height;
	this.img       =  cacheImage;
    
    this.draw = function(context) {
    	context.drawImage(this.img, this.position.x, this.position.y, this._width, this._height);
    }
}

/*********************************************************************
   SPRITESHEET CLASS OBJECT
***********************************************************************/
G.SpriteSheet = function(cacheImage, frameWidth, frameHeight) {
	G.SpriteSheet = G.extendDeep(this, new G.Entity());
    
    this.img = cacheImage;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;
	this.framesPerRow = Math.floor(this.img.width / this.frameWidth);
	this.framesPerColumn = Math.floor(this.img.height / this.frameHeight);
}


/*********************************************************************
   ANIMATION CLASS OBJECT
***********************************************************************/
G.Animation = function(spritesheet, frameSpeed, startFrame, endFrame) {
 
	var animationSequence = [];  // array holding the order of the animation
	var currentFrame = 0;        // the current frame to draw
	var counter = 0;             // keep track of frame rate


	this.stopFrame = 0;
	this.stoped    = false;

	// create the sequence of frame numbers for the animation
	for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++) {
	    animationSequence.push(frameNumber);
	}

    this.stopFrame = function(value) {
    	 if (value == null) return this.stopFrame;
    	 this.stopFrame = value--;
    }

    this.stop = function() {}


	// Update the animation
	this.update = function() {
		// update to the next frame if it is time
		if (counter == (frameSpeed - 1)) {
		    currentFrame = (currentFrame + 1) % animationSequence.length;
		}

		// update the counter
		counter = (counter + 1) % frameSpeed;
	};
   
 
	// draw the current frame
	this.draw = function() {
		// get the row and col of the frame
		var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
		var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

		ctx.drawImage( spritesheet.img, col * spritesheet.frameWidth, row * spritesheet.frameHeight,
		  spritesheet.frameWidth, spritesheet.frameHeight,
		  x, y,
		  spritesheet.frameWidth, spritesheet.frameHeight);
		};
    }
}


}());