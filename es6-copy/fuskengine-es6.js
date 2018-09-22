(function() {
    "use strict";
    /* var FUSK = FUSK || {};

    FUSK.images = {};
    FUSK.audios = {};
    //FUSK. =

    /* Core Functions
    *********************************************************************/
    /*FUSK.assertion = function (condition, msg) {
        if (condition) {
            //console.warn(msg || "Assertion error!");
            throw new Error("Error in case evaluation");
        }
    }

    FUSK.LoadAssets = function (assets, callback) {
        var count = assets.length;
        assets.forEach(function(asset) {

        });
    };*/

    class CanvasContext {
        //var context, width, height;

        constructor(canvas, canvasWidth, canvasHeight) {
            this.context = canvas.getContext("2d");
            this.width  = canvasWidth;
            this.height = cnavasheight;
        }

        clear() {
            this.clearRect(0, 0, this.width, this.height);
        }
    }

    class LoadAssets {
        //var images = {};
        //var audios = {};
        //var assetsCount  = 0;

        constructor(assets=[], callback) {
            this.images = {};
            this.audios = {};
            this.assetsCount  = 0;

            this.count = assets.length;

            assets.forEach(function(asset) {
                var assetArray = asset.split(" ");
                //Sort aasets based on extension into their various objects
                var ext = ....
                if (ext in ["png", "jpg", "gif", "svg"]) {
                    var img = new Image();

                    img.onload = function() {
                        this.images[assetArray[0].trim()] = img);
                        this.count--;
                        if (count === 0) callback();
                        // _*_ if () if aasets is last but count is not 0, throw error
                    }

                    img.onerror = function() {
                        throw new Error(`Could not load ${asset.src}`);
                    }

                    img.src = assetArray[1].trim();
                } else if (ext in ["mp3", "wav", "ogg"]) {

                } else {
                    throw new Error(`${assetArray[1]} has an unsupported extension`);
                }

            });
        }

        getImage(name) {
            return this.images[name];
        }
    }


    window.addEventListener("DOMContentLoaded", function() {
        var canvas = document.getElementById("canvas");
        canvas.width = "600px";
        canvas.height = "400px";

        var context = new CanvasContext(canvas);
    })
}());
