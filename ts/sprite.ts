/// <reference path="./entity.ts"/>

let assets = new fsc.AssetBank("", [], function() {});
assets.loadImage("toy", "img/toy.png");

module fsc {
    export class Sprite extends Entity {
        width: number;
        image: Object;

        constructor(id:string, image: Object, x: number, y: number) {
            super(id, x, y);
            this.image = image;
        }
    }
}
