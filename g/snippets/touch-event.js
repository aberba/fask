function mouseXY(e) {
if (!e)
var e = event;
canX = e.pageX - can.offsetLeft;
canY = e.pageY - can.offsetTop;
showPos();
}
function touchXY(e) {
if (!e)
var e = event;
e.preventDefault();
canX = e.targetTouches[0].pageX - can.offsetLeft;
canY = e.targetTouches[0].pageY - can.offsetTop;
showPos();
}

//multiple touches
ar len = e.targetTouches.length; //ecorded on touchStart
function touchXY(e) {
if (!e)
e = event;
e.preventDefault();
len = e.targetTouches.length;
for (i = 0; i < len; i++) {
canX[i] = e.targetTouches[i].pageX - can.offsetLeft;
canY[i] = e.targetTouches[i].pageY - can.offsetTop;
}
}

//check if cordinates are in canvas
ctx.isPointInPath(x, y);

//click button for both mouse and touch
<button id="but1" class="myButton" onmousedown="press1()" onmouseup="release1()" 
ontouchstart="press1()" ontouchend="release1()">
Click Me
</button>

can.addEventListener("mousedown", mouseDown, false);
can.addEventListener("mousemove", mouseXY, false);
can.addEventListener("touchstart", touchDown, false);
can.addEventListener("touchend", touchUp, false);
can.addEventListener("touchmove", touchXY, false);

document.body.addEventListener("mouseup", mouseUp, false);
document.body.addEventListener("touchcancel", touchUp, false);