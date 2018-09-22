"use strict";

var canvas, scene, rect;

(function() {
    window.addEventListener("DOMContentLoaded", function()
    {
        canvas = document.querySelector("#canvas");
        scene = new fsc.Scene(canvas, 600, 400);
        fsc.loadImage("toy", "img/toy.png", function(img)
        {
            // console.log(img);
            // console.log("loaded");
        });

        rect = new fsc.Rectangle("box", 30, 30, 50, 50);
        rect.setFillColor("yellow");
        console.log(fsc);


        function update()
        {
            scene.clear();

            scene.draw(rect);

            window.requestAnimationFrame(update);
            //scene.setFillColor(fsc.Color.Black);
            //rect.position.x += 1;
            // rect.position.y += 0.01;
            //
            // if (rect.position.x > (scene.width - rect.width))
            // {
            //     rect.position.x = 0;
            // }

            // if (rect.position.x > (scene.width - rect.width))
            // {
            //     rect.position.x = 0;
            // }
        }
        update();
    });
}());
