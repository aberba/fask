"use strict";
function say() { }
exports.say = say;
function say2() { }
exports.say2 = say2;
var fsc;
(function (fsc) {
    var Vector2 = (function () {
        function Vector2(x, y) {
            this.position.x = x;
            this.position.y = y;
        }
        Object.defineProperty(Vector2.prototype, "prev", {
            get: function () {
                return this.previous;
            },
            set: function (point) {
                this.previous.x = point.x;
                this.previous.y = point.y;
            },
            enumerable: true,
            configurable: true
        });
        Vector2.prototype.set = function (v) {
            this.position.x = v.position.x;
            this.position.y = v.position.y;
            return this;
        };
        Vector2.prototype.multiplyBy = function (v) {
            this.position.x *= v.position.x;
            this.position.y *= v.position.y;
            return this;
        };
        Vector2.prototype.add = function (v) {
            this.position.x += v.position.x;
            this.position.y += v.position.y;
            return this;
        };
        Vector2.prototype.addTo = function (v) {
            v.position.x += this.position.x;
            v.position.y += this.position.y;
            return v;
        };
        Vector2.prototype.subtract = function (v) {
            this.position.x -= v.position.x;
            this.position.y -= v.position.y;
            return this;
        };
        Vector2.prototype.divide = function (v) {
            this.position.x /= v.position.x;
            this.position.y /= v.position.y;
            return this;
        };
        return Vector2;
    }());
    fsc.Vector2 = Vector2;
})(fsc || (fsc = {}));
