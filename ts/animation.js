"use strict";
var Atlas = (function () {
    function Atlas(sprite, options) {
        this.sprite = sprite;
        this.key = sprite.key;
        this.width = sprite.width;
        this.height = sprite.height;
    }
    return Atlas;
}());
exports.Atlas = Atlas;
var Animation = (function () {
    function Animation(atlas, options) {
        this.atlas = atlas;
        this.animationSequence = [];
        this.currentFrame = 0;
        this.counter = 0;
        this.startFrame = options.startFrame;
        this.endFrame = options.endFrame;
        this.stopFrame = 0;
        this.isStopped = false;
        for (var frameNumber = this.startFrame; frameNumber <= this.endFrame; frameNumber++) {
            this.animationSequence.push(frameNumber);
        }
    }
    Object.defineProperty(Animation.prototype, "frameToStop", {
        get: function () {
            return this.stopFrame;
        },
        enumerable: true,
        configurable: true
    });
    Animation.prototype.stop = function () { };
    Animation.prototype.updateFrame = function () {
        if (this.counter == (this.frameSpeed - 1)) {
            this.currentFrame = (this.currentFrame + 1) % this.animationSequence.length;
        }
        this.counter = (this.counter + 1) % this.frameSpeed;
    };
    Animation.prototype.draw = function (context) {
        var row = Math.floor(this.animationSequence[this.currentFrame] / this.atlas.framesPerRow);
        var col = Math.floor(this.animationSequence[this.currentFrame] % this.atlas.framesPerRow);
        context.drawImage(this.atlas.img, col * this.atlas.frameWidth, row * this.atlas.frameHeight, this.atlas.frameWidth, this.atlas.frameHeight, this.atlas.x, this.atlas.y, this.atlas.frameWidth, this.atlas.frameHeight);
    };
    return Animation;
}());
exports.Animation = Animation;
