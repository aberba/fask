var fsc;
(function (fsc) {
    var Color = (function () {
        function Color(r, g, b, a) {
            this.color.r = r;
            this.color.g = g;
            this.color.b = b;
            this.color.a = a || 0;
        }
        return Color;
    }());
    fsc.Colors = {
        Black: "#000000",
        Grey: "#eeeeee",
        Yellow: "yellow",
        Green: "green",
        Blue: "blue",
        White: "white"
    };
})(fsc || (fsc = {}));
