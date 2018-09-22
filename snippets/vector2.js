   // Core Objects / Classes
    F.vector2 = function(x, y) {
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
