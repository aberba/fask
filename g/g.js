var G = {};
G._images = {};
G._sounds = {};
G._sprites = {};

G.loadingImages = 0;

G.Keys = {
	A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, 
	I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, 
	Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88,
	Y: 89, Z: 90
};
 


/**************************************************************
       Entity Class: All elements drawn on canvas are entities  
***************************************************************/
"use strict";
G.Entity  = function() {

	this._width  = 0;
	this._height = 0;
	this.radius  = 5;
	this.life    = 0;
	this.gravity = 0;
	this.weight  = 0;
	this.img     = null;

	this.jumping     = false;
	this.jumpAllowed = false;
	this.dead        = false;

	this.position  = new G.Vector2();
	this.Color    = new G.Color();
	this.velocity  = new G.Vector2();

	this.draw = function(context) {
        context.fillStyle = this.Color;
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
G.Entity.prototype.constructor = G.Entity;*/




/**************   Vector2 Class ******************/
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




/****************  Color Class   **********************/
G.Color  = function(r, g, b, a) {
    this.r      = r || 0;
    this.g      = g || 0;
    this.b      = b || 0;
    this.a      = a || 1;

    this.Color = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")".toString();

    this.blur = function(quantity) {
    	this. a -= quantity;

    	if (this.a < 0) this.a = 0;
        return this.Color;
    }

    this.deepen = function(quantity) {
    	this.a += quantity;

    	if (this.a > 1) this.a = 1;
    	return this.Color;
    }

    this.set    = function(Color) {
    	this.r = Color.r;
    	this.g = Color.g;
    	this.b = Color.b;
    	this.a = Color.a;

    	return this.Color;
    }

    return this.Color;
}
G.Color.prototype.constructor = G.Color;




/***************  Core Functions ************/

G.extendDeep = function(decendant, ancestor) {
    var ancestor = ancestor || {};

    for (var i in ancestor) {
        if (decendant[i] == "object") {
            ancestor[i] = ( decendant[i] === Array ) ? [] : {};
            parent.extend( decendant[i], ancestor[i] );
        } else {
            decendant[i] = ancestor[i];
        }
    }

    return decendant;
}

G.extend = function(decendant, ancestor) {
	var ancestor = ancestor || {};

	for (var i in ancestor) {
		if (ancestor.hasOwnpreperty(ancestor[i])) {
			decendant[i] = ancestor[i];
		}
	}

	return decendant;
}

G.loadImage = function(id, source) {
	 G.loadingImages++;

     var img = new Image();
     img.onload = function() {
          G._images[id] = img;
          G.loadingImages--;
     }
     img.src = source;
}




/*************** Elements Functions *********/
G.Quadratic = function(x, y, _width, _height) {
	G.Quadratic = G.extendDeep(this, new G.Entity);

    this.position.x = x || 0;
    this.position.y = y || 0;
	this._width     = _width  || 5;
	this._height    = _height || 5;

    var parent = this;

    this.draw = function(context) {
        context.fillStyle = this.Color;
        context.fillRect(this.position.x, this.position.y, this._width, this._height);
    }
}
G.Quadratic.prototype.constructor = G.Quadratic;

G.Sprite = function(img, x, y, _width, _height) {
	G.Sprite = G.extendDeep(this, new G.Entity);
    
    this.position  = new G.Vector2(x, y);
    this._width  = _width;
    this._height = _height;
	this.img = img;
    
    this.draw = function(context) {
    	context.drawImage(this.position.x, this.position.y, this._width, this._height);
    }
}