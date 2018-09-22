//import Sprite from "./sprite";

interface IAtlasOptions {
    widht: number;
    height: number;
    cellHeight: number;
    cellWidth: number;
    cellSpacingH: number;
    cellSpacingV: number;
    cellShape: string;
}

interface IAnimation {
    startFrame: number;
    endFrame: number;
    stopFrame: number;
    frameSpeed: number;
}

interface ISprite {
    key: string;
    width: number;
    height: number;
}

export class Atlas {
    sprite: Object;
    key : string;
    width: number;
    height: number;
    cellHeight: number;
    cellWidth: number;
    cellSpacingH: number;
    cellSpacingV: number;
    cellShape: string;

    constructor(sprite: ISprite, options) {
        this.sprite = sprite;
        this.key = sprite.key;
        this.width = sprite.width;
        this.height = sprite.height;

        // Cell Options
    }
}

export class Animation {
    atlas: any;
    animationSequence: any[];
    startFrame: number;
    endFrame: number;
    currentFrame: number;
    stopFrame: number;
    frameSpeed: number;
    isStopped: boolean;
    counter: number;

    constructor(atlas, options: IAnimation) {
        this.atlas = atlas;
        this.animationSequence = [];  // array holding the order of the animation
        this.currentFrame = 0;        // the current frame to draw
        this.counter = 0;             // keep track of frame rate

        this.startFrame = options.startFrame;
        this.endFrame   = options.endFrame;

        this.stopFrame = 0;
        this.isStopped = false;

        // create the sequence of frame numbers for the animation
        for (var frameNumber = this.startFrame; frameNumber <= this.endFrame; frameNumber++) {
            this.animationSequence.push(frameNumber);
        }
    }

    get frameToStop(): number {
         return this.stopFrame;
    }

    stop() {}

    // Update the animation frame to the next frame of the atlas
    updateFrame(): void {
        // update to the next frame if it is time
        if (this.counter == (this.frameSpeed - 1)) {
            this.currentFrame = (this.currentFrame + 1) % this.animationSequence.length;
        }

        // update the counter
        this.counter = (this.counter + 1) % this.frameSpeed;
    }

    // draw the current frame
    draw(context) {
        // get the row and col of the frame
        var row = Math.floor(this.animationSequence[this.currentFrame] / this.atlas.framesPerRow);
        var col = Math.floor(this.animationSequence[this.currentFrame] % this.atlas.framesPerRow);

        context.drawImage( this.atlas.img, col * this.atlas.frameWidth, row * this.atlas.frameHeight,
            this.atlas.frameWidth, this.atlas.frameHeight, this.atlas.x, this.atlas.y,
            this.atlas.frameWidth, this.atlas.frameHeight);
    }
}
