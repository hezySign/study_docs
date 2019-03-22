// 可绘制的对象
class Drawable {

    constructor() {
        this.color = 'gray'; // 填充和划线绘制时的颜色
        this.lineWidth = '1';
        this.fill = false; // 是否是填充绘制方式：true-是，false-不是
        this.rotateDegree = 0; //旋转角度 [0, 360]
    }

    draw(canvas) {
        canvas.fillStyle = this.color
        canvas.strokeStyle = this.color;
        canvas.lineWidth = this.lineWidth;
        if (this.fill) {
            canvas.fill();
        } else {
            canvas.stroke();
        }
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    }

    setFill(fill) {
        this.fill = fill;
        return this;
    }

    setRotateDegree(degree) {
        this.rotateDegree = degree;
        return this;
    }
}

// 绘制圆形
class Circle extends Drawable {
    constructor(x, y, radius) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(canvas) {
        canvas.save();
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvas.closePath();
        super.draw(canvas);
        canvas.restore();
    }
}

// 绘制矩形
class Rect extends Drawable {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(canvas) {
        canvas.save();
        canvas.beginPath();
        canvas.rect(this.x, this.y, this.width, this.height);
        super.draw(canvas);
        canvas.restore();
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * 绘制不规则多边形
 */
class IrregularPolygon extends Drawable {
    constructor(points) {
        super();
        this.points = points;
        if (points && points.length > 1) {
            this.x = points[0].x;
            this.y = points[0].y;
        }
    }

    draw(canvas) {
        canvas.save();
        canvas.rotate(20 * Math.PI / 180);
        canvas.beginPath();
        if (this.points && this.points.length > 2) {
            this.points.forEach((e, index) => {
                if (index == 0) {
                    canvas.moveTo(e.x, e.y);
                } else {
                    canvas.lineTo(e.x, e.y);
                }
            });
        } else {
            throw Error('多边形至少需要提供平面上3个点的坐标')
        }
        super.draw(canvas);
        canvas.restore();
    }

    addPoint(point) {
        if (!this.points) {
            this.points = [];
        }
        this.points.push(point);
        return this;
    }

    add(x, y) {
        this.addPoint(new Point(x, y));
        return this;
    }
}

// class Arrow extends Drawable {
//     constructor(startX, startY, lineLength, degree) {
//         this.startX = startX;
//         this.startY = startY;
//         this.lineLength = lineLength;
//         this.degree = this.degree;

//     }
// }
