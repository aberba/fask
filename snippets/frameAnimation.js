 /* params = (Atlas atlas, object options) */
    F.Animation = function(atlas, options) {
        var self = this;

        self.atlas = atlas;
        self.animationSequence = [];  // array holding the order of the animation
        self.currentFrame = 0;        // the current frame to draw
        self.counter = 0;             // keep track of frame rate
        
        self.startFrame = options.startFrame;
        self.endFrame   = options.endFrame;

        self.stopFrame = 0;
        self.isStopped = false;

        // create the sequence of frame numbers for the animation
        for (var frameNumber = self.startFrame; frameNumber <= self.endFrame; frameNumber++) {
            self.animationSequence.push(frameNumber);
        }

        self.stopFrame = function(value) {
             if (value == null) return self.stopFrame;
             self.stopFrame = value--;
        }

        self.stop = function() {};


        // Update the animation frame to the next frame of the atlas
        self.updateFrame = function() {
            // update to the next frame if it is time
            if (counter == (self.frameSpeed - 1)) {
                self.currentFrame = (currentFrame + 1) % animationSequence.length;
            }

            // update the counter
            self.counter = (self.counter + 1) % self.frameSpeed;
        };
       
        // draw the current frame
        self.draw = function() {
            // get the row and col of the frame
            var row = Math.floor(self.animationSequence[self.currentFrame] / self.atlas.framesPerRow);
            var col = Math.floor(self.animationSequence[self.currentFrame] % self.atlas.framesPerRow);

            ctx.drawImage( self.atlas.img, col * self.atlas.frameWidth, row * self.atlas.frameHeight,
                self.atlas.frameWidth, self.atlas.frameHeight, self.atlass.x, self.atlas.y,
                self.atlas.frameWidth, self.atlas.frameHeight);
        };
    };