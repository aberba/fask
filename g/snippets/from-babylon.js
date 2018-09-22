 var Vector2 = (function () {
        function Vector2(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector2.prototype.toString = function () {
            return "{X: " + this.x + " Y:" + this.y + "}";
        };

        // Operators
        Vector2.prototype.toArray = function (array, index) {
            if (index === undefined) {
                index = 0;
            }

            array[index] = this.x;
            array[index + 1] = this.y;
        };

        Vector2.prototype.asArray = function () {
            var result = [];

            this.toArray(result, 0);

            return result;
        };

        Vector2.prototype.copyFrom = function (source) {
            this.x = source.x;
            this.y = source.y;
        };

        Vector2.prototype.copyFromFloats = function (x, y) {
            this.x = x;
            this.y = y;
        };

        Vector2.prototype.add = function (otherVector) {
            return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
        };

        Vector2.prototype.addVector3 = function (otherVector) {
            return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
        };

        Vector2.prototype.subtract = function (otherVector) {
            return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
        };

        Vector2.prototype.subtractInPlace = function (otherVector) {
            this.x -= otherVector.x;
            this.y -= otherVector.y;
        };

        Vector2.prototype.multiplyInPlace = function (otherVector) {
            this.x *= otherVector.x;
            this.y *= otherVector.y;
        };

        Vector2.prototype.multiply = function (otherVector) {
            return new Vector2(this.x * otherVector.x, this.y * otherVector.y);
        };

        Vector2.prototype.multiplyToRef = function (otherVector, result) {
            result.x = this.x * otherVector.x;
            result.y = this.y * otherVector.y;
        };

        Vector2.prototype.multiplyByFloats = function (x, y) {
            return new Vector2(this.x * x, this.y * y);
        };

        Vector2.prototype.divide = function (otherVector) {
            return new Vector2(this.x / otherVector.x, this.y / otherVector.y);
        };

        Vector2.prototype.divideToRef = function (otherVector, result) {
            result.x = this.x / otherVector.x;
            result.y = this.y / otherVector.y;
        };

        Vector2.prototype.negate = function () {
            return new Vector2(-this.x, -this.y);
        };

        Vector2.prototype.scaleInPlace = function (scale) {
            this.x *= scale;
            this.y *= scale;
            return this;
        };

        Vector2.prototype.scale = function (scale) {
            return new Vector2(this.x * scale, this.y * scale);
        };

        Vector2.prototype.equals = function (otherVector) {
            return otherVector && this.x === otherVector.x && this.y === otherVector.y;
        };

        // Properties
        Vector2.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };

        Vector2.prototype.lengthSquared = function () {
            return (this.x * this.x + this.y * this.y);
        };

        // Methods
        Vector2.prototype.normalize = function () {
            var len = this.length();

            if (len === 0)
                return this;

            var num = 1.0 / len;

            this.x *= num;
            this.y *= num;

            return this;
        };

        Vector2.prototype.clone = function () {
            return new Vector2(this.x, this.y);
        };

        // Statics
        Vector2.Zero = function () {
            return new Vector2(0, 0);
        };

        Vector2.FromArray = function (array, offset) {
            if (!offset) {
                offset = 0;
            }

            return new Vector2(array[offset], array[offset + 1]);
        };

        Vector2.FromArrayToRef = function (array, offset, result) {
            result.x = array[offset];
            result.y = array[offset + 1];
        };

        Vector2.CatmullRom = function (value1, value2, value3, value4, amount) {
            var squared = amount * amount;
            var cubed = amount * squared;

            var x = 0.5 * ((((2.0 * value2.x) + ((-value1.x + value3.x) * amount)) + (((((2.0 * value1.x) - (5.0 * value2.x)) + (4.0 * value3.x)) - value4.x) * squared)) + ((((-value1.x + (3.0 * value2.x)) - (3.0 * value3.x)) + value4.x) * cubed));

            var y = 0.5 * ((((2.0 * value2.y) + ((-value1.y + value3.y) * amount)) + (((((2.0 * value1.y) - (5.0 * value2.y)) + (4.0 * value3.y)) - value4.y) * squared)) + ((((-value1.y + (3.0 * value2.y)) - (3.0 * value3.y)) + value4.y) * cubed));

            return new Vector2(x, y);
        };

        Vector2.Clamp = function (value, min, max) {
            var x = value.x;
            x = (x > max.x) ? max.x : x;
            x = (x < min.x) ? min.x : x;

            var y = value.y;
            y = (y > max.y) ? max.y : y;
            y = (y < min.y) ? min.y : y;

            return new Vector2(x, y);
        };

        Vector2.Hermite = function (value1, tangent1, value2, tangent2, amount) {
            var squared = amount * amount;
            var cubed = amount * squared;
            var part1 = ((2.0 * cubed) - (3.0 * squared)) + 1.0;
            var part2 = (-2.0 * cubed) + (3.0 * squared);
            var part3 = (cubed - (2.0 * squared)) + amount;
            var part4 = cubed - squared;

            var x = (((value1.x * part1) + (value2.x * part2)) + (tangent1.x * part3)) + (tangent2.x * part4);
            var y = (((value1.y * part1) + (value2.y * part2)) + (tangent1.y * part3)) + (tangent2.y * part4);

            return new Vector2(x, y);
        };

        Vector2.Lerp = function (start, end, amount) {
            var x = start.x + ((end.x - start.x) * amount);
            var y = start.y + ((end.y - start.y) * amount);

            return new Vector2(x, y);
        };

        Vector2.Dot = function (left, right) {
            return left.x * right.x + left.y * right.y;
        };

        Vector2.Normalize = function (vector) {
            var newVector = vector.clone();
            newVector.normalize();
            return newVector;
        };

        Vector2.Minimize = function (left, right) {
            var x = (left.x < right.x) ? left.x : right.x;
            var y = (left.y < right.y) ? left.y : right.y;

            return new Vector2(x, y);
        };

        Vector2.Maximize = function (left, right) {
            var x = (left.x > right.x) ? left.x : right.x;
            var y = (left.y > right.y) ? left.y : right.y;

            return new Vector2(x, y);
        };

        Vector2.Transform = function (vector, transformation) {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]);
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]);

            return new Vector2(x, y);
        };

        Vector2.Distance = function (value1, value2) {
            return Math.sqrt(Vector2.DistanceSquared(value1, value2));
        };

        Vector2.DistanceSquared = function (value1, value2) {
            var x = value1.x - value2.x;
            var y = value1.y - value2.y;

            return (x * x) + (y * y);
        };
        return Vector2;
    })();
    BABYLON.Vector2 = Vector2;




    var Color4 = (function () {
        function Color4(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        // Operators
        Color4.prototype.addInPlace = function (right) {
            this.r += right.r;
            this.g += right.g;
            this.b += right.b;
            this.a += right.a;
        };

        Color4.prototype.asArray = function () {
            var result = [];

            this.toArray(result, 0);

            return result;
        };

        Color4.prototype.toArray = function (array, index) {
            if (index === undefined) {
                index = 0;
            }
            array[index] = this.r;
            array[index + 1] = this.g;
            array[index + 2] = this.b;
            array[index + 3] = this.a;
        };

        Color4.prototype.add = function (right) {
            return new Color4(this.r + right.r, this.g + right.g, this.b + right.b, this.a + right.a);
        };

        Color4.prototype.subtract = function (right) {
            return new Color4(this.r - right.r, this.g - right.g, this.b - right.b, this.a - right.a);
        };

        Color4.prototype.subtractToRef = function (right, result) {
            result.r = this.r - right.r;
            result.g = this.g - right.g;
            result.b = this.b - right.b;
            result.a = this.a - right.a;
        };

        Color4.prototype.scale = function (scale) {
            return new Color4(this.r * scale, this.g * scale, this.b * scale, this.a * scale);
        };

        Color4.prototype.scaleToRef = function (scale, result) {
            result.r = this.r * scale;
            result.g = this.g * scale;
            result.b = this.b * scale;
            result.a = this.a * scale;
        };

        Color4.prototype.toString = function () {
            return "{R: " + this.r + " G:" + this.g + " B:" + this.b + " A:" + this.a + "}";
        };

        Color4.prototype.clone = function () {
            return new Color4(this.r, this.g, this.b, this.a);
        };

        // Statics
        Color4.Lerp = function (left, right, amount) {
            var result = new Color4(0, 0, 0, 0);

            BABYLON.Color4.LerpToRef(left, right, amount, result);

            return result;
        };

        Color4.LerpToRef = function (left, right, amount, result) {
            result.r = left.r + (right.r - left.r) * amount;
            result.g = left.g + (right.g - left.g) * amount;
            result.b = left.b + (right.b - left.b) * amount;
            result.a = left.a + (right.a - left.a) * amount;
        };

        Color4.FromArray = function (array, offset) {
            if (typeof offset === "undefined") { offset = 0; }
            return new Color4(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
        };

        Color4.FromInts = function (r, g, b, a) {
            return new Color4(r / 255.0, g / 255.0, b / 255.0, a / 255.0);
        };
        return Color4;
    })();
    BABYLON.Color4 = Color4;