/// <reference path="./color.ts"/>

module fsc {
    interface IPoint2D
    {
        x: number;
        y: number;
    }

    export class Entity
    {
        id: string;
        width: number;
        height: number;
        position: IPoint2D = {x:0, y:0};
        fillColor: string;

        constructor(id: string, x, y) {
            this.id = id;
            this.position.x = x | 0;
            this.position.y = y | 0;
            this.fillColor = fsc.Colors.Yellow;
        }

        setFillColor(color: string)
        {
            this.fillColor = color;
        }

        drawOn(scene)
        {
            console.log("Draw not implemented");
        }
    }

    export class Rectangle extends Entity
    {
        constructor(id, x, y, width, heigth)
        {
            super(id, x, y);
            this.width = width;
            this.height = heigth;
            this.fillColor = "blue";//fsc.Color.Grey;
        }

        setPosition(p: IPoint2D)
        {
            this.position.x = p.x;
            this.position.y = p.y;
        }

        drawOn(scene)
        {
            scene.setFillColor(this.fillColor);
            scene.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}
