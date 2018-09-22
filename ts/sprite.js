var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var assets = new fsc.AssetBank("", [], function () { });
assets.loadImage("toy", "img/toy.png");
var fsc;
(function (fsc) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(id, image, x, y) {
            _super.call(this, id, x, y);
            this.image = image;
        }
        return Sprite;
    }(fsc.Entity));
    fsc.Sprite = Sprite;
})(fsc || (fsc = {}));
