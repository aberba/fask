(function(F, window, document {
    var n;
    F.Events = function() {
        var self = this;
        
        self.on = function(type, callback){
            // create an array if it doesn't exist
            if (!this.hasOwnProperty("_listeners")) {
               this._listeners = [];
            }

            if (typeof this._listeners[type] === undefined){
               this._listeners[type] = [];
            }

            this._listeners[type].push(callback);
        };

        self.fire = function(event){
            if (!event.target){
               event.target = this;
            }

            if (!event.type){ // false
               throw new Error("Event object missing 'type' property.");
            }

            if (this._listeners && this._listeners[event.type] instanceof Array) {
               var listeners = this._listeners[event.type];
               for (var i=0, len=listeners.length; i < len; i++){
                   listeners[i].call(this, event);
               }
            }
        };

        self.removeListener = function(type, listener){
            if (this._listeners && this._listeners[type] instanceof Array){
                var listeners = this._listeners[type];
                for (var i=0, len=listeners.length; i < len; i++){
                    if (listeners[i] === listener){
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        };

        self.loadImageAssets = function(assetsArray) {
            if (parent.numLoadedImages == parent.numImageAssets) parent.loaded = true;
            parent.update();  return;

            if (typeof assetsArray !== "object") throw "iSuck.createAssets(): agument must be arrays";

            var i = 0, numAssets = assetsArray.length, image;
            parent.numImageAssets = numAssets;

            for (i; i < numAssets; i++) {
                if (typeof assetsArray[i] !== "object") throw "assets[" + i + "] must be na object";
                image = new Image();
                parent.imageAssets[assetsArray[i].imageName] = null;
                image.onload = function() {
                    parent.imageAssets[assetsArray[i].imageName] = image;
                    parent.numLoadedImages += 1;
                    if (parent.numLoadedImages == parent.numImageAssets) parent.loaded = true;
                    parent.update();
                }
                image.src = assetsArray[i].src;
            }
        };

        
        /*********************************************************
                        OBJECTS
        *********************************************************/
        self.render = function(numCanvas, container) {
                var n   = parseInt(numCanvas, 10);
                var num = (n >= 1) ? n : 1;
                var cv  = null, ctx = null, con;

                for (var i = 0; i < num; i++) {
                    cv        = document.createElement("canvas");
                    cv.id     = "canvas" + (i + 1);
                    cv.width  = parent.view.w;
                    cv.height = parent.view.h;

                    con = (container == null) ? document.body : container;
                    con.appendChild( cv );

                    ctx   = cv.getContext("2d");
                    parent.contexts.push( ctx );
                }
            
        };

        self.createEntity = function() {
            this._id = null;
            this.a: 1;
            this.ag: 0.18;
            this.vx: 2;
            this.vy: 2;
            this._type: "defaut";
            this._shape: "square";
            this.w: 30;
            this.h: 30;
            this.fillColor: "red";
            this.radius: 20;
            this.startAngle:parent.degToRad(0);
            this.endAngle: parent.degToRad(360);

            this.pos: {
                x: 0,
                y: 0
            };

            setPos: function(Vect2) {
                this.prevX = this.x;
                this.prevY = this.y;
                this.x     = Vect2.x;
                this.y     = Vect2.y;
            },

            collidesWith: function(entity) {
                if ( (this.pos.x > entity.pos.x) && (this.pos.x + this.w < entity.pos.x + entity.w) && 
                     (this.pos.y > entity.pos.y) && (this.pos.y + this.h < entity.pos.y + entity.h) ) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        self.extendDeep = function(decendant, ancestor) {
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
        };

        self.vect2 = function(x, y) {
            if (x == null || y == null) throw "Vect2(): x & y cords not set";
            this.x     = x;
            this.y     = y;
            this.prevX = x;
            this.prevY = y;

            this.normalize = function() {

            }

            this.teleportTo = function(x, y) {
                this.prevX = x;
                this.prevY = y;
                this.x = x;
                this.y = y;
                return this;
            }

            this._moveTo = function(x, y) {
                this.prevX = x;
                this.prevY = y;

                var i = 0, max = (x > y) ? x : y;
                var mx = x / max;
                var my = y / max;

                for(i; i < max; i++) {
                    this.x += mx;
                    this.y += my;
                }
                return this;
            }

            this.minus = function(Vect2) {
                this.x = this.x - Vect2.x;
                this.y = this.y - Vect2.y;
                return this;
            }
            return this;    
        };

    };



}(FASK, window, document));