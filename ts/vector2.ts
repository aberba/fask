
export function say() {}
export function say2() {}

module fsc {
    interface IPoint2 {
        x: number;
        y: number;
    }

    export class Vector2 {
        position: IPoint2;
        previous: IPoint2;

        constructor(x: number, y: number) {
            this.position.x = x;
            this.position.y = y;
        }

        set prev(point: IPoint2) {
            this.previous.x = point.x;
            this.previous.y = point.y;
        }

        get prev(): IPoint2 {
            return this.previous;
        }

        set(v: Vector2) {
            this.position.x = v.position.x;
            this.position.y = v.position.y;
            return this;
        }

        multiplyBy(v: Vector2): Vector2 {
            this.position.x *= v.position.x;
            this.position.y *= v.position.y;
            return this;
        }

        add(v: Vector2): Vector2 {
            this.position.x += v.position.x;
            this.position.y += v.position.y;
            return this;
        }

        addTo(v: Vector2): Vector2 {
            v.position.x += this.position.x;
            v.position.y += this.position.y;
            return v;
        }

        subtract(v: Vector2): Vector2 {
            this.position.x -= v.position.x;
            this.position.y -= v.position.y;
            return this;
        }

        divide(v: Vector2): Vector2 {
            this.position.x /= v.position.x;
            this.position.y /= v.position.y;
            return this;
        }
    }
}
