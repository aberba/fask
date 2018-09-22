
//game pad
 //Completed Gamepad API object: 
function handleMouseMove(evt) {
Game.balloonPosition = { x : evt.pageX, y : evt.pageY };
}

 /*   Audio classs *****/
function Sound(sound, looping) {
this.looping = typeof looping !== 'undefined' ? looping : false;
this.snd = new Audio();
if (this.snd.canPlayType("audio/ogg")) {
this.snd.src = sound + ".ogg";
} else if (this.snd.canPlayType("audio/mpeg")) {
this.snd.src = sound + ".mp3";
} else // we cannot play audio in this browser
this.snd = null;
}
Sound.prototype.play = function () {
if (this.snd === null)
return;
this.snd.load();
this.snd.autoplay = true;
if (!this.looping)
return;
this.snd.addEventListener('ended', function () {
this.load();
this.autoplay = true;
}, false);
};

Object.defineProperty(Sound.prototype, "volume",
{
get: function () {
return this.snd.volume;
},
set: function (value) {
this.snd.volume = value;
}
});


var gamepadAPI = {
controllers: {},
active: false,
gamepadConnected: function(event) {
var controller = event.gamepad;
var controllerID = event.gamepad.id;
gamepadAPI.controllers[event.gamepad.index] = controller;
gamepadAPI.active = true;
console.log("Connected Gamepad ID: "+controllerID+".");
},
gamepadDisconnected: function(event) {
delete gamepadAPI.controllers[event.gamepad.index];
if(!gamepadAPI.controllers.length) {
gamepadAPI.active = false;
}
console.log('Gamepad disconnected.');
},
buttonPressed: function(event, pressed) {
var button = event.button;
if(pressed) {
console.log("Button "+button+" was pressed.");
if(button == 1) { // button[1] is B or O
GAME.startNewGame();
}
}
else {
console.log("Button "+button+" was released.");
}
},
axisPressed: function(event) {
var axis = event.axis;
var value = event.value;
console.log("Axis: "+axis+", value: "+value+".");
}
};

//Here are all the event listeners:
window.addEventListener("gamepadconnected", function(e) {
gamepadAPI.gamepadConnected(e);
});
window.addEventListener("gamepaddisconnected", function(e) {
gamepadAPI.gamepadDisconnected(e);
});
window.addEventListener("gamepadbuttondown", function(e) {
gamepadAPI.buttonPressed(e, true);
});
window.addEventListener("gamepadbuttonup", function(e) {
gamepadAPI.buttonPressed(e, false);
});
window.addEventListener("gamepadaxismove", function(e){
gamepadAPI.axisPressed(e);
});

 //Let's create a GAME object for our game 
var GAME = {};
// Here's the function that will start our game
GAME.startNewGame = function(){
alert("New game started!");
}


Vec2.prototype = { 
muls: function(n) { return new Vec2(this.x*n, this.y*n); }, 
imuls: function(n) { this.x *= n; this.y *= n; return this; }, 
mul: function(v) { return new Vec2(this.x*v.x, this.y*v.y); }, 
imul: function(v) { this.x *= v.x; this.y *= v.y; return this; }, 
divs: function(n) { return new Vec2(this.x/n, this.y/n); }, 
div: function(v) { return new Vec2(this.x/v.x, this.y/v.y); }, 
adds: function(n) { return new Vec2(this.x+n, this.y+n); }, 
iadds: function(s) { this.x+=s; this.y+=s; return this; }, 
add: function(v) { return new Vec2(this.x+v.x, this.y+v.y); }, 
iadd: function(v) { this.x+=v.x; this.y+=v.y; return this;}, 
subs: function(n) { return new Vec2(this.x-n, this.y-n); }, 
isubs: function(s) { this.x-=s; this.y-=s; return this;}, 
sub: function(v) { return new Vec2(this.x-v.x, this.y-v.y); }, 
isub: function(v) { this.x-=v.x; this.y-=v.y; return this;}, 
set: function(x, y) {this.x = x; this.y = y;} 
}; 


//Full screen
canvas.requestFullscreen();
canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
canvas.mozRequestFullScreen();
And here’s how it looks for exiting fullscreen:
document.exitFullscreen();
document.webkitExitFullscreen();
document.mozCancelFullscreen();

// exit events
document.addEventListener("fullscreenchange", function () {
if(document.fullscreen == false) onFullscreenLose();
}, false);
document.addEventListener("mozfullscreenchange", function () {
if(document.mozFullScreen == false) onFullscreenLose();
}, false);
document.addEventListener("webkitfullscreenchange", function () {
if(document.webkitIsFullScreen == false) onFullscreenLose();
}, false);
image-rendering: optimize-contrast;
	image-rendering: -moz-crisp-edges;
	image-rendering: -webkit-optimize-contrast;