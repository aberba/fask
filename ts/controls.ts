module fsc {
    export class Keyboard {
        private keyBindings: Object;
        public pressedKeys: Object;

        //List of keycodes
        public Key = {
            A: 1,
            B: 2,
            C: 3
        };

        constructor() {
            this.keyBindings = {};
            this.pressedKeys = {};

            let key;
            for (key in this.Key) {
                this.pressedKeys[key] = false;
            };

            window.addEventListener("keydown", function(e) {
                this.pressedkeys[e.keyCode.toString()] = true;
            });

            window.addEventListener("keyup", function(e) {
                this.pressedkeys[e.keyCode.toString()] = false;
            });
        }

        // bindKey(keycode: number, character: string) {
        //     this.keyBindings[character] = keycode;
        // }

        isDown(key: number)
        {
            return this.pressedKeys[key.toString()] == true;
        }

        isUp(key: number)
        {
            return this.pressedKeys[key.toString()] == false;
        }
    }
}
