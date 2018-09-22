  /*********************************************************************
       CONTROLS FUNCTIONS & OBJECT
    ***********************************************************************/
    // Controls Keys and codes
    G.controls.Keys = {
        A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, 
        I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, 
        Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88,
        Y: 89, Z: 90
    };

    F.controls.pressedKeys = {
        65: false, 66: false, 67: false, 68: false, 69: false, 70: false,
        71: false, 72: false, 73: false, 74: false, 75: false, 76: false,
        77: false, 78: false, 79: false, 80: false, 81: false, 82: false,
        83: false, 84: false, 85: false, 86: false, 87: false, 88: false,
        89: false, 90: false
    };

    F.controls.Keyboard = function() {
        window.addEventListener("keydown", function(e) {
            F.controls.pressedKeys[e.keycode || e.which] = true;
        });

        window.addEventListener("keyup", function(e) {
            F.controls.pressedKeys[e.keycode || e.which] = false;
        });

        this.invokeKeyDown = function(keyCode) {

        };

        this.invokeKeyUp = function(keyCode) {
            
        };
    };
