var fsc;
(function (fsc) {
    var Keyboard = (function () {
        function Keyboard() {
            this.Key = {
                A: 1,
                B: 2,
                C: 3
            };
            this.keyBindings = {};
            this.pressedKeys = {};
            var key;
            for (key in this.Key) {
                this.pressedKeys[key] = false;
            }
            ;
            window.addEventListener("keydown", function (e) {
                this.pressedkeys[e.keyCode.toString()] = true;
            });
            window.addEventListener("keyup", function (e) {
                this.pressedkeys[e.keyCode.toString()] = false;
            });
        }
        Keyboard.prototype.isDown = function (key) {
            return this.pressedKeys[key.toString()] == true;
        };
        Keyboard.prototype.isUp = function (key) {
            return this.pressedKeys[key.toString()] == false;
        };
        return Keyboard;
    }());
    fsc.Keyboard = Keyboard;
})(fsc || (fsc = {}));
