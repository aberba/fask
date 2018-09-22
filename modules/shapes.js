(function(F, window, document) {
    "use strict";

    /*************************************************************
          SHAPE CLASS OBJECTS

          *Quadiratic
          *Circle
          *Triangle
    *************************************************************/

    var E = {};
    var F.Entity = Object.create(E);
    F.Entity.prototype.draw = function(context) {};

    F.CreateCircle = function(x, y, radiusInDegrees, startAngle, endAngle, anticlockwise) {
        F.Circle        = F.extendDeep(this, new F.Entity());

        this._type      = "circle";
        this.position.x = x || 0;
        this.position.y = y || 0;
        this.fill       = true;
        this.radius     = radiusInDegrees;
        this.startAngle = F.degreesToRadians(startAngle);
        this.endAngle   = F.degreesToRadians(endAngle);
        this.anticlockwise = anticlockwise || false;

        this.draw = function(context) {
            context.fillStyle = this.fillStyle;
            context.strokeStyle = this.strokeStyle;
            context.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
            context.stroke();
            context.closePath();

            if (this.fill) context.fill();
        }
    }


    F.CreateQuad = function(x, y, _width, _height) {
    	  F.Quadratic = F.extendDeep(this, new F.Entity());
         
        this._type = "quadratic";
        this.position.x = x || 0;
        this.position.y = y || 0;
    	  this._width     = _width  || 5;
    	  this._height    = _height || 5;

        this.draw = function(context) {
            context.fillStyle = this.fillStyle;
            context.fillRect(this.position.x, this.position.y, this._width, this._height);
        }
    }
    F.Quadratic.prototype.constructor = F.Quadratic;



    /*******************************************************************************************
        CIRCLE SHAPE OBJECT
    ********************************************************************************************/
    F.Circle = function(x, y, radiusInDegrees, startAngle, endAngle, anticlockwise) {
        F.Circle        = F.extendDeep(this, new F.Entity());

        this._type      = "circle";
        this.position.x = x || 0;
        this.position.y = y || 0;
        this.fill       = true;
        this.radius     = radiusInDegrees;
        this.startAngle = F.degreesToRadians(startAngle);
        this.endAngle   = F.degreesToRadians(endAngle);
        this.anticlockwise = anticlockwise || false;

        this.draw = function(context) {
            context.fillStyle = this.fillStyle;
            context.strokeStyle = this.strokeStyle;
            context.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
            context.stroke();
            context.closePath();

            if (this.fill) context.fill();
        }
    }
    F.Circle.prototype.constructor = F.Circle;

}(FASK, window, document));