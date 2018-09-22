/****************************************************************************
            WELCOME TO G.js GAME LIBRARY
            G.js is not neccessary a game engine but designed to provide 
            you with the neccessary tools to create aa HTML5 canvas game
            using the canvas API and some handy Browser APIs.

            HEPE YOU ENJOY USING G.js :)
*****************************************************************************/

/*******************************************************************
    CORE.js contains code that are usually needed in creating a scene

    * Entity
    * Colour
    * Vector2

*********************************************************************/
alert("Core");

var G = {};

(function() {
"use strict";

G.version_ = "0.0.1";
G.logErrors_ = true;
G.uniqueID_  = 0;        

/******************************************************************************
       STORAGE OBJECTS
******************************************************************************/
G.cacheImages     = {};
G.cacheAudio    = {};
G.cacheSprites    = {};
G.cacheData       = {};
G.loadingAssets   = 0;


/******************************************************************************
       KEY CODES FOR KEYBOARD
******************************************************************************/
G.keyboard = {
	A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, 
	I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, 
	Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88,
	Y: 89, Z: 90
};


G.errors = {
	assetLoading: "Oops! error: asset loading failed",
	missingParam: "Parameeter not provided by programmer",
	ajaxError: "Ajax request failed"
};


/******************************************************************************
       CORE FUNCTIONS
******************************************************************************/

G.uniqueid = function() {
    G.uniqueID_++;
    return G.uniqueID_;
} 

G.extendDeep = function(child, mother) {
    var mother = mother || {};

    for (var i in mother) {
        if (child[i] == "object") {
            mother[i] = ( child[i] === Array ) ? [] : {};
            parent.extend( child[i], mother[i] );
        } else {
            child[i] = mother[i];
        }
    }

    return child;
}


G.extend = function(child, mother) {
	var mother = mother || {};

	for (var i in mother) {
		if (mother.hasOwnpreperty(mother[i])) {
			child[i] = mother[i];
		}
	}

	return child;
}

// Validation functions
G._isString = function(obj) {
    return typeof obj === "string";
}

G._isNumber = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
}


G.loadAsset = function(assetType, uniquename, source, callback, throwOnError) {
	G.loadingAssets++;
    var img = new Image();

    img.addEventListener("load", function() {
		switch(assetType) {
			case 'sprite':
			    G.cacheSprites[uniquename] = img;
			    G.loadingAssets--;
			    if (callback != null) callback();
			    break;

			case 'image':
			    G.cacheImages[uniquename] = img;
			    G.loadingAssets--;
			    if (callback != null) callback();
			    break;

			case 'audio':
			    G.cacheAudio[uniquename] = img;
			    G.loadingAssets--;
			    if (callback != null) callback();
			    break;

		    case 'data':
			    G.cacheData[uniquename] = img;
			    G.loadingAssets--;
			    if (callback != null) callback();
			    break;
			default:
			    throw "Asset type is not supported";
			    break;
     	  }
          G.loadingAssets--;
    });

    img.addEventListener("error", function() {
        if (G.logErrors_) console.log("G.loadAsset(): download error");
        if (throwOnError == null || throwOnError) throw G.errors.assetLoading + " -> " + source;
    });

    img.src = source;
}


/******************************************************************************
       GENERAL GAME ELEMENTS PARENT
       NB: All game elements inherit from this object
******************************************************************************/
G.Entity  = function() {

	this._width  = 0;
	this._height = 0;
	this.radius  = 5;
	this.life    = 0;
	this.img     = null;


    //State properties of every object
	this.jumping     = false;
	this.jumpAllowed = false;
	this.dead        = false;

   
    // Physical properties of every game element
	this.position  = new G.Vector2();
	this.colour    = new G.Colour();
	this.velocity  = new G.Vector2();
	this.mass      = 0;
	this.gravity = 0;
	this.weight  = 0;


	this.draw = function(context) {
        context.fillStyle = this.colour;
        context.fillRect(this.position.x, this.position.y, this._width, this._height);
    }



	this.update       = function() {}



    this.collidesWith = function(Entity) {
    	if  ( 
    		(this.position.x > Entity.position.x && this.position.x + this._width < (Entity.position.x + Entity._width) ) && 
    	    (this.position.y > Entity.position.y && this.position.y + this._height < (Entity.position.y + Entity._width)) 
    	    ) {
            return true;

    	} else {
    		return false;
    	}
    }
}
G.Entity.prototype.constructor = G.Entity;



/*******************************************************************
     COLOR CLASS OBJECT

*********************************************************************/
G.Colour  = function(r, g, b) {
    this.r      = r || 0;
    this.g      = g || 0;
    this.b      = b || 0;
    this.a      = 1;

    this.colour = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")".toString();

    this.blur = function(quantity) {
        this. a -= quantity;

        if (this.a < 0) this.a = 0;
        return this.colour;
    }

    this.deepen = function(quantity) {
        this.a += quantity;

        if (this.a > 1) this.a = 1;
        return this.colour;
    }

    this.set    = function(Colour) {
        this.r = Colour.r;
        this.g = Colour.g;
        this.b = Colour.b;
        this.a = Colour.a;

        return this.colour;
    }

    return this.colour;
}
G.Colour.prototype.constructor = G.Colour;



/*******************************************************************
     VECTOR2 CLASS OBJECT
*********************************************************************/
G.Vector2 = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
	this.prex = 0;
	this.prey = 0;

	this.set = function(x, y) {
        this.prex = this.x;
        this.prey = this.y;
	 	this.x = x;
	 	this.y = y;

	 	return this;
	}

	this.add = function(Vector2) {
		this.x += Vector2.x;
		this.y += Vector2.y;

		return this;
	}

	this.subtract = function(Vector2) {
		this.x -= Vector2.x;
		this.y -= Vector2.y;

		return this;
	}
}
G.Vector2.prototype.constructor = G.Vector2;



}());
