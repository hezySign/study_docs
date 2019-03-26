// 白板
class WhiteBoard {
    constructor({
        canvasId= null, // canvasId
        color= '#999999', // 画笔颜色
        lineWidth= 1, // 线条宽度
        shape= 'line', // 绘制形状: line, rect, circle, any, arrow
        onDrawStart = null,
        onDrawing = null,
        onDrawEnd = null,
    }) {
        this.drawables = [];

        let ele = document.getElementById(canvasId);
        this.canvas = ele.getContext("2d");

        let drawable;

        ele.onmousedown = e => {
            this.isDrawing = true;
            let x = e.clientX, y = e.clientY;
            console.log(e);
            switch(shape) {
                case 'line': drawable = new Line(x, y).setColor(color).setLineWidth(lineWidth);
                    break;
                case 'rect': drawable = new Rect(x, y).setColor(color).setLineWidth(lineWidth);
                    break;
                case 'circle': drawable = new Circle(x, y).setColor(color).setLineWidth(lineWidth);
                    break;
                case 'any': drawable = new AnyDrawable(x, y).setColor(color).setLineWidth(lineWidth);
                    break;
                case 'arrow': drawable = new Arrow(x, y).setColor(color).setLineWidth(lineWidth);
                    break;
            }
        };
        ele.onmousemove = e => {
            if (this.isDrawing) {
                let x = e.clientX, y = e.clientY;
                console.log(x, y, drawable);
                if (drawable && drawable instanceof Drawable) {
                    console.log(true)
                    drawable.setEndPoint(x, y).draw(this.canvas);
                } else {
                    console.log(false)
                }
            }
        };
        ele.onmouseup = e => {
            this.isDrawing = false;
            if (this.drawables && drawable && drawable instanceof Drawable) {
                this.drawables.push(drawable);
            }
            console.log(e, this.drawables);
        };
    }
}

// 可绘制的对象，需要至少两个点的坐标
class Drawable {

    constructor(x, y, x1, y1) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
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
        console.log(this);
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

    setEndPoint(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
    }
}

// 点
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// 直线
class Line extends Drawable {
    
    draw(canvas) {
        canvas.save();
        canvas.beginPath();
        canvas.moveTo(this.x, this.y);
        canvas.lineTo(this.x1, this.y1);
        canvas.closePath();
        super.draw(canvas);
        canvas.restore();
    }
}

// 绘制圆形
class Circle extends Drawable {

    draw(canvas) {
        let centerX = (this.x + this.x1) / 2;
        let centerY = (this.y + this.y1) / 2;
        let radius = Math.sqrt(Math.pow(this.x1 - this.x, 2) + Math.pow(this.y1 -this.y, 2)) / 2;
        canvas.save();
        canvas.beginPath();
        canvas.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvas.closePath();
        super.draw(canvas);
        canvas.restore();
    }
}

// 绘制矩形
class Rect extends Drawable {

    draw(canvas) {
        canvas.save();
        canvas.beginPath();
        canvas.rect(this.x, this.y, this.x1 - this.x, this.y1 - this.y);
        super.draw(canvas);
        canvas.restore();
    }
}

/**
 * 绘制不规则多边形或线段，至少需要2个点
 */
class AnyDrawable extends Drawable {
    constructor(x, y, x1, y1) {
        super(x, y, x1, y1);
        this.add(x, y);
        this.add(x1, y1);
    }

    draw(canvas) {
        if (this.points && this.points.length > 1) {
            canvas.save();
            canvas.beginPath();
            this.points.forEach((e, index) => {
                if (index == 0) {
                    canvas.moveTo(e.x, e.y);
                } else {
                    canvas.lineTo(e.x, e.y);
                }
            });
            super.draw(canvas);
            canvas.restore();
        } else {
            throw Error('多边形至少需要提供平面上2个点的坐标')
        }
    }

    add(x, y) {
        return this.setEndPoint(x, y);
    }

    setEndPoint(x1, y1) {
        let point = new Point(x1, y1);
        if (!this.points) {
            this.points = [];
        }
        if (!(point instanceof Point)) {
            //console.warn(point, ' is not instanceof Point');
        } else if (typeof point.x != 'number' || typeof point.y != 'number') {
            //console.warn(point, 'point has error number.');
        } else {
            this.x1 = x1;
            this.y1 = y1;
            this.points.push(point);
        }
        return this;
    }
}

// 绘制箭头
class Arrow extends AnyDrawable {
    constructor(x, y, x1, y1) {
        super(x, y);
        this.aLength = 10;
        this.aSize1 = 3;
        this.aSize2 = 8;
        this.setEndPoint(x1, y1);
    }

    // 设置箭头样式
    setArrowSize(aLength, aSize1, aSize2) {
        this.aLength = aLength;
        this.aSize1 = aSize1;
        this.aSize2 = aSize2;
        return this;
    }

    // 重置箭头绘制的样式
    setEndPoint(x1, y1) {
        this.x1 = x1;
        this.y1 = y1;
        let x = this.x, y = this.y;
        let L = this.aLength, S1 = this.aSize1, S2 = this.aSize2;
        let PI = Math.PI;
        let degree = x != x1 ? Math.atan((y1 -y) / (x1 -x)) : 
            y > y1 ? 3 * PI/2 : PI/2;

        this.points = [
            new Point(x, y),
            new Point(x1 - L * Math.cos(degree) + S1 * Math.cos(PI/2 + degree),
                y1 - L * Math.sin(degree) + S1 * Math.sin(PI/2 - degree)),
            new Point(x1 - L * Math.cos(degree) + S2 * Math.cos(PI/2 + degree),
                y1 - L * Math.sin(degree) + S2 * Math.sin(PI/2 - degree)),
            new Point(x1, y1),
            new Point(x1 - L * Math.cos(degree) - S2 * Math.cos(PI/2 + degree),
                y1 - L * Math.sin(degree) - S2 * Math.sin(PI/2 - degree)),
            new Point(x1 - L * Math.cos(degree) - S1 * Math.cos(PI/2 + degree),
                y1 - L * Math.sin(degree) - S1 * Math.sin(PI/2 - degree)),
            new Point(x, y),
        ];
        return this;
    }
}
