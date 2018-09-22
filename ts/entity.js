var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fsc;
(function (fsc) {
    var Entity = (function () {
        function Entity(id, x, y) {
            this.position = { x: 0, y: 0 };
            this.id = id;
            this.position.x = x | 0;
            this.position.y = y | 0;
            this.fillColor = fsc.Colors.Yellow;
        }
        Entity.prototype.setFillColor = function (color) {
            this.fillColor = color;
        };
        Entity.prototype.drawOn = function (scene) {
            console.log("Draw not implemented");
        };
        return Entity;
    }());
    fsc.Entity = Entity;
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(id, x, y, width, heigth) {
            _super.call(this, id, x, y);
            this.width = width;
            this.height = heigth;
            this.fillColor = "blue";
        }
        Rectangle.prototype.setPosition = function (p) {
            this.position.x = p.x;
            this.position.y = p.y;
        };
        Rectangle.prototype.drawOn = function (scene) {
            scene.setFillColor(this.fillColor);
            scene.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        };
        return Rectangle;
    }(Entity));
    fsc.Rectangle = Rectangle;
})(fsc || (fsc = {}));
