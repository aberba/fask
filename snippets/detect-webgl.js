if (window.WebGLRenderingContext) {
     webGLcanvasApp()
} else if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    html5CanvasAppFMobile()
} else {
    html5CanvasApp()
}