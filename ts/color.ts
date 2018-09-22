module fsc {
    interface IColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    class Color {
        color: IColor;

        constructor(r: number, g: number, b: number, a: number) {
            this.color.r = r;
            this.color.g = g;
            this.color.b = b;
            this.color.a = a || 0;
        }
    }

    export var Colors =
    {
        Black: "#000000",
        Grey: "#eeeeee",
        Yellow: "yellow",
        Green: "green",
        Blue: "blue",
        White: "white"
    };
}
