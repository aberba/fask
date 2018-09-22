/// <reference path="./color.ts"/>
var fsc;
(function (fsc) {
    fsc.version = "0.0.0";
    console.log("fsc: Version " + fsc.version);
    //Normalized prefixed implementations
    fsc.raf = window.requestAnimationFrame; // || webkitRequestAnimationFrame
    fsc.caf = window.cancelAnimationFrame; //webkitCancelAnimationFrame
    // Asset Caches
    fsc.audioBuffers = {};
    fsc.imagesCache = {};
    // Global unique ID
    var gid = 0;
    fsc.uid = function (prefix) {
        gid++;
        return (prefix !== null) ? prefix + gid : gid;
    };
    // Internal Objects
    var WebAudioContext = AudioContext; // || webkitAudioContext || mozAudioContext;
    var Scene = (function () {
        function Scene(canvas, width, height) {
            this.children = [];
            this.canvas = canvas;
            this.height = height;
            this.width = width;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.context = this.canvas.getContext("2d");
            this.canvasBackgroundColor = fsc.Colors.Black;
            this.context.fillStyle = this.canvasBackgroundColor;
            this.fill();
        }
        Scene.prototype.clear = function (mustFill) {
            if (mustFill === void 0) { mustFill = true; }
            this.context.clearRect(0, 0, this.width, this.height);
            this.setFillDefault();
            mustFill ? this.fill() : null;
        };
        Scene.prototype.startAnimation = function (callback) {
            this.animationID = fsc.raf(callback);
        };
        Scene.prototype.stopAnimation = function () {
            fsc.caf(this.animationID);
        };
        Scene.prototype.setFillColor = function (color) {
            this.context.fillStyle = color;
        };
        Scene.prototype.setFillDefault = function () {
            this.context.fillStyle = this.canvasBackgroundColor;
        };
        Scene.prototype.fill = function () {
            this.context.fillRect(0, 0, this.width, this.height);
        };
        Scene.prototype.draw = function (entity) {
            //(for later) this.children[entity.id] = entity;
            entity.drawOn(this);
            this.setFillDefault();
        };
        Scene.prototype.setUpdateLoop = function (callback) {
        };
        return Scene;
    }());
    fsc.Scene = Scene;
    var State = (function () {
        function State(name, preload, update) {
            this.name = name;
            this.preload = preload;
            this.update = update;
        }
        return State;
    }());
    fsc.State = State;
    var Game = (function () {
        function Game(scene, state) {
            this.scene = scene;
            this.state = state;
        }
        Game.prototype.setState = function (state) {
            this.state = state;
        };
        Game.prototype.runStatePreload = function () {
            this.state.preload();
        };
        return Game;
    }());
    fsc.Game = Game;
    var AssetBank = (function () {
        //private count: number;
        function AssetBank(dir, assetsArray, callback) {
            if (dir === void 0) { dir = ""; }
            var count = assetsArray.length; /// initialize count for loader
            var xhr = new XMLHttpRequest();
            var audioContext = new WebAudioContext();
            assetsArray.forEach(function (asset) {
                var assetArray = asset.split(".");
                // Check to make sure each assets is well formatted e.g. player.png
                // without more than one dots
                console.assert(assetArray.length !== 2, "Error: " + asset + " has an in valid " +
                    "format. make sure is hass  only one dot in file name");
                var ext = assetArray.pop().toString();
                var key = assetArray.pop().toString();
                //Sort aasets based on extension into their various objects
                if (ext in ["png", "jpg", "gif", "svg"]) {
                    var img_1 = new Image();
                    img_1.onload = function () {
                        fsc.imagesCache[key] = img_1;
                        --count; //register assest as loaded my reducing count
                        if (count === 0)
                            callback();
                    };
                    img_1.onerror = function () {
                        throw new Error("Could not load " + asset);
                    };
                    img_1.src = dir + asset;
                }
                else if (ext in ["mp3", "wav", "ogg"]) {
                    //load each audio files, covert to buffer & cache buffer
                    // **** [recheck to varify implementation] ****
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 200) {
                            audioContext.decodeAudioData(xhr.response, function (buffer) {
                                fsc.audioBuffers[key] = buffer;
                            });
                        }
                        //register assest as loaded my reducing count
                        count--;
                        if (count === 0)
                            callback();
                    };
                    xhr.onerror = function (e) {
                        throw new Error("Error: " + e);
                    };
                    xhr.responseType = "arraybuffer";
                    xhr.open("GET", assetArray[1], true);
                    xhr.send(null);
                }
                else {
                    throw new Error(assetArray[1] + " has an unsupported extension");
                }
            });
        }
        //implement error checking
        AssetBank.prototype.getImage = function (key) {
            return this.imageAssets[key];
        };
        AssetBank.prototype.getAudio = function (key) {
            return this.audioBuffers[key];
        };
        AssetBank.prototype.loadImage = function (id, fileName, callback) {
            var img = new Image();
            img.onload = function () {
                fsc.imagesCache[id] = img;
                console.log(img);
                if (callback)
                    callback(fsc.imagesCache[id]);
            };
            img.onerror = function (e) {
                console.error(e);
            };
            img.src = fileName;
        };
        return AssetBank;
    }());
    fsc.AssetBank = AssetBank;
})(fsc || (fsc = {}));
