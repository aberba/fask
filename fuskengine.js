var FASK = {};

(function (F, window, document) {
    "use strict";

        
    /* Global Namespace Objects
    ********************************************************************/
    F.assets = {};
    F.controls = {};
    F.media = {};
    F.uix = {};

    /* Cache Objects
     * *******************************************************************/
    F.imageCache = {};
    F.audioCache = {};

    F.mainLoop =  window.requestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msrequestAnimationFrame  ||
                        window.webkitRequestAnimationFrame;

     /*********************************************************************
       CORE FUNCTIONS
    ***********************************************************************/
    F.degreesToRadians = function(degrees) {
        return (degrees * (Math.PI / 180));
    };

    F.extendObject = function(child, mother) {
        var i;
    	for (i in mother) {
    		if (mother.hasOwnpreperty(mother[i])) {
    			child[i] = mother[i];
    		}
    	}

    	return child;
    };

    F.assertion = function(condition, msg) {
        if (condition) {
            //console.warn(msg || "Assertion error!");
            throw new Error("Error :> " + msg);
        }
    };

    // Core Objects / Classes
    F.v2 = function(x, y) {
    	this.x = x;
    	this.y = y;
    	this.prevX = 0;
    	this.prevY = 0;

    	this.set = function(x, y) {
            this.prevX = this.x;
            this.prevY = this.y;
    	 	this.x = x;
    	 	this.y = y;

    	 	return this;
    	}

        this.get = function() {
            return this;
        };

    	this.add = function(v2) {
    		this.x += v2.x;
    		this.y += v2.y;

    		return this;
    	};

    	this.subtract = function(v2) {
    		this.x -= v2.x;
    		this.y -= v2.y;

    		return this;
    	}

        this.distanceTo = function(v2) {
            return Math.sqrt(this.x*this.x + this.y*this.y);
        }.bind(this);
    };

    
    
     /*********************************************************************
       ASSET MANAGEMENT OBJECT
    ***********************************************************************/
    // Assets management
    F.assets.preloadAssets = function(assets, callback) {
        F.images = {};
        F.audios = {};
        F.assetsCount  = 0;

        var count = assets.length;

        assets.forEach(function(asset) {
            var assetArray = asset.split(" ");

            var ext = assetArray[1].split(".").pop();

            //Sort aasets based on extension into their various objects
            if (["png", "jpg", "gif", "svg"][ext]) {
                var img = new Image();

                img.onload = function() {
                    F.images[assetArray[0].trim()] = img;
                    count--; //register assest as loaded my reducing count
                    if (count === 0) callback();
                    // _*_ if () if aasets is last but count is not 0, throw error
                }

                img.onerror = function() {
                    throw new Error(`Could not load ${asset.src}`);
                }

                img.src = assetArray[1].trim();
            } else if (ext in ["mp3", "wav", "ogg"]) {
                //load each audio files, covert to buffer & store buffer in cache
                var xhr = new XMLHTTPRequest();
                xhr.onreadystatechange = function(e) {
                    if (xhr.readyState === 200) {
                        var stream = xhr.response;
                    }
                }
                xhr.open("GET",assetArray[1]);
                xhr.send(null);

            } else {
                throw new Error( assetArray[1] + " has an unsupported extension" );
            }
        });

        this.getImage = function(name) {
            return this.images[name];
        }
    };

    
    
     /*********************************************************************
       CONTROLS FUNCTIONS & OBJECT
    ***********************************************************************/
    // Controls functions and Objects
    G.controls.keyboardKeys = {
        A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, 
        I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, 
        Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88,
        Y: 89, Z: 90
    };

    F.controls.keyCodes = {
        65: false, 66: false, 67: false, 68: false, 69: false, 70: false,
        71: false, 72: false, 73: false, 74: false, 75: false, 76: false,
        77: false, 78: false, 79: false, 80: false, 81: false, 82: false,
        83: false, 84: false, 85: false, 86: false, 87: false, 88: false,
        89: false, 90: false
    };

    F.controls.Keyboard = function() {
        window.addEventListener("keydown", function(e) {
            F.controls.keyCodes[e.keycode || e.which] = true;
        });

        window.addEventListener("keyup", function(e) {
            F.controls.keyCodes[e.keycode || e.which] = false;
        });

        this.invokeKeyDown = function(keyCode) {

        };

        this.invokeKeyUp = function(keyCode) {
            
        };
    };



    // Creates canvas context with all context methods attached to instance
    F.CreateContext = function(canvas) {
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        /* Object functions */
        this.clear = function() {
            this.clearRect(0, 0, this.width, this.height);
        }

        this.setFill = function(color) {};

        this.drawShape = function() {}

        this.drawSprite = function() {};

        this.drawAtlas = function(atlas) {};

        this.rotate = function(v2) {};

        this.scale = function(v2) {};
    };

    F.Color =  function(r, g, b, a) {
        var self = this;
        self.r = r || 0;
        self.g = g || 0;
        self.b = b || 0;
        self.a = (a == null) ? 1 : a;

        this.setOpacity = function(value) {
            self.a = (value >= 0 && value <=1) ? value : self.a;
            return self;
        };
        
        this.get = function() {
            return self;
        }
    };


    /*********************************************************************
       ANIMATION CLASS OBJECT
    ***********************************************************************/
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


}(FASK, window, document));


window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    canvas.width = "600px";
    canvas.height = "400px";

    var context = new FASK.CreateContext(canvas);
});
