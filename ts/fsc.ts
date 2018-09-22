/// <reference path="./color.ts"/>

module fsc {
    export let version = "0.0.0";
    console.log("fsc: Version " + version);

    //Normalized prefixed implementations
    export const raf = window.requestAnimationFrame; // || webkitRequestAnimationFrame
    export const caf = window.cancelAnimationFrame; //webkitCancelAnimationFrame

    // Asset Caches
    export let audioBuffers = {};
    export let imagesCache = {};

    // Global unique ID
    let gid = 0;
    export let uid = (prefix?: string) => {
        gid++;
        return (prefix !== null) ? prefix + gid : gid;
    };

    // Internal Objects
    let WebAudioContext = AudioContext;// || webkitAudioContext || mozAudioContext;

    export class Scene
    {
        canvas: any;
        context: any;
        width: number;
        height: number;
        animationID: number;
        canvasBackgroundColor: string;
        children: any[] = [];

        constructor(canvas, width: number, height: number) {
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

        clear(mustFill: boolean = true) {
            this.context.clearRect(0, 0, this.width, this.height);
            this.setFillDefault();
            mustFill ? this.fill() : null;
        }

        startAnimation(callback) {
            this.animationID = raf(callback);
        }

        stopAnimation() {
            caf(this.animationID);
        }

        setFillColor(color: string)
        {
            this.context.fillStyle = color;
        }

        setFillDefault()
        {
            this.context.fillStyle = this.canvasBackgroundColor;
        }

        fill()
        {
            this.context.fillRect(0, 0, this.width, this.height);
        }

        draw(entity: any)
        {
            //(for later) this.children[entity.id] = entity;
            entity.drawOn(this);
            this.setFillDefault();
        }

        setUpdateLoop(callback)
        {

        }
    }

    interface IState
    {
        name: string;
        preload(): any;
        update(): any;
    }

    export class State implements IState
    {
        name: string;
        public preload;
        public update;

        constructor(name, preload, update)
        {
            this.name = name;
            this.preload = preload;
            this.update = update;
        }
    }

    export class Game
    {
        private state: State;
        private scene: Scene;

        constructor(scene, state?: State)
        {
            this.scene = scene;
            this.state = state;
        }

        setState(state: State)
        {
            this.state = state;
        }

        runStatePreload()
        {
            this.state.preload();
        }
    }

    export class AssetBank {
        //private self: AssetLoader = this;
        private imageAssets: Object;
        private audioBuffers: Object;
        private fontAssets: Object;

        //private count: number;

        constructor(dir: string="", assetsArray: string[], callback) {
            let count = assetsArray.length;  /// initialize count for loader
            const xhr = new XMLHttpRequest();
            const audioContext = new WebAudioContext();

            assetsArray.forEach(function(asset) {
                let assetArray: string[] =  asset.split(".");

                // Check to make sure each assets is well formatted e.g. player.png
                // without more than one dots
                console.assert(assetArray.length !== 2, "Error: "+ asset + " has an in valid " +
                "format. make sure is hass  only one dot in file name");

                let ext: string = assetArray.pop().toString();
                let key: string = assetArray.pop().toString();

                //Sort aasets based on extension into their various objects
                if (ext in ["png", "jpg", "gif", "svg"]) {
                    let img = new Image();

                    img.onload = function() {
                        imagesCache[key] = img;
                        --count; //register assest as loaded my reducing count
                        if (count === 0) callback();
                    };

                    img.onerror = function() {
                        throw new Error("Could not load " + asset);
                    }
                    img.src = dir + asset;
                } else if (ext in ["mp3", "wav", "ogg"]) {
                    //load each audio files, covert to buffer & cache buffer
                    // **** [recheck to varify implementation] ****
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 200) {
                            audioContext.decodeAudioData(xhr.response, (buffer) => {
                                audioBuffers[key] = buffer;
                            });
                        }

                        //register assest as loaded my reducing count
                        count--;
                        if (count === 0) callback();
                    }
                    xhr.onerror = function(e) {
                        throw new Error("Error: " + e);
                    }
                    xhr.responseType = "arraybuffer";
                    xhr.open("GET",assetArray[1], true);
                    xhr.send(null);

                } else {
                    throw new Error( assetArray[1] + " has an unsupported extension" );
                }
            });
        }

        //implement error checking
        getImage(key: string): Object {
            return this.imageAssets[key];
        }

        getAudio(key: string): Object {
            return this.audioBuffers[key];
        }

        loadImage(id: string, fileName: string, callback?)
        {
            var img = new Image();
            img.onload = function()
            {
                fsc.imagesCache[id] = img;
                console.log(img);
                if (callback) callback(fsc.imagesCache[id]);
            }

            img.onerror = function(e)
            {
                console.error(e);
            }
            img.src = fileName;
        }
    }
}
