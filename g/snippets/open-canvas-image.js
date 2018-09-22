window.addEventListener("keydown", function() {
	    window.open(canvas.toDataURL(),"canvasImage","left=0,top=0,width=" +
		    canvas.width + ",height=" + canvas.height +",toolbar=0,resizable=0");
});