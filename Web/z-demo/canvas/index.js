// 白板
class WhiteBoard {
    constructor(canvasId, {
        color = '#999999', // 画笔颜色
        lineWidth = 1, // 线条宽度
        shape = 'line', // 绘制形状: line, rect, circle, any, arrow
        onDrawEnd = null,
    }) {
        this.setConfig({color, lineWidth, shape, onDrawEnd});

        let ele = document.getElementById(canvasId);
        let ctx = ele.getContext("2d");
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        this.ele = ele;
        this.ctx = ctx;
        this.canvasWidth = ele.width;
        this.canvasHeight = ele.height;

        let drawable = null;
        ele.onmousedown = e => {
            this.isDrawing = true;
            let {color, shape, lineWidth} = this;
            let x = e.pageX - ele.offsetLeft, y = e.pageY - ele.offsetTop;
            switch (shape) {
                case 'line': drawable = new Line(ctx).setColor(color).setLineWidth(lineWidth);
                    break;
                case 'rect': drawable = new Rect(ctx).setColor(color).setLineWidth(lineWidth);
                    break;
                case 'circle': drawable = new Circle(ctx).setColor(color).setLineWidth(lineWidth);
                    break;
                case 'any': drawable = new Drawable(ctx).setColor(color).setLineWidth(lineWidth);
                    break;
                case 'arrow': drawable = new Arrow(ctx).setColor(color).setLineWidth(lineWidth);
                    break;
                default: console.error('不支持的shape', shape)
                    break;
            }
            if (drawable && drawable instanceof Drawable) {
                drawable.draw(x, y, false);
            }
        };
        ele.onmousemove = e => {
            if (this.isDrawing) {
                let {shape, step, canvasWidth, canvasHeight} = this;
                let x = e.pageX - ele.offsetLeft, y = e.pageY - ele.offsetTop;
                if (drawable && drawable instanceof Drawable) {
                    if (shape && shape != 'any') {
                        // 绘制封装好的形状
                        let canvasPic = new Image();
                        if (step >= 0) {
                            canvasPic.src = this.canvasHistory[step];
                        }
                        canvasPic.onload = () => {
                            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                            ctx.drawImage(canvasPic, 0, 0);
                            drawable.draw(x, y, true);
                        };
                    } else {
                        // 画笔绘制形式
                        drawable.draw(x, y, true);
                    }
                }
            }
        };
        ele.onmouseup = () => {
            this.isDrawing = false;
            this.onPush();
        };
        ele.mouseleave = () => {
            this.isDrawing = false;
            this.onPush();
        }

        this.clearAll();
    }

    // 设置参数
    setConfig({
        color,
        lineWidth,
        shape,
        onDrawEnd
    }) {
        if (color) {
            this.color = color;
        }
        if (lineWidth) {
            this.lineWidth = lineWidth;
        }
        if (shape) {
            this.shape = shape;
        }
        if (onDrawEnd) {
            this.onDrawEnd = onDrawEnd;
        }
        console.log('setConfig', color, lineWidth, shape, onDrawEnd, this)
    }

    // 记录本次绘制
    onPush() {
        this.step++;
        if (this.step < this.canvasHistory.length) {
            this.canvasHistory.length = this.step;
        }
        this.canvasHistory.push(this.ele.toDataURL());

        if (this.onDrawEnd instanceof Function) {
            this.onDrawEnd(ctx);
        }
        console.log('onPush', this.step, this.canvasHistory.length);
    }

    // 清除所有绘制
    clearAll() {
        let ctx = this.ctx;
        this.step = -1;
        this.canvasHistory = [];
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.onPush();
    }

    // 撤销方法
    undo() {
        console.log('undo', this.step, this.canvasHistory.length);
        let ctx = this.ctx;
        if (this.step > 0) {
            this.step--;
            let canvasPic = new Image();
            canvasPic.src = this.canvasHistory[this.step];
            canvasPic.onload = () => {
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                ctx.drawImage(canvasPic, 0, 0);
            };
        } else {
            console.log('不能再继续撤销了');
        }
    }

    // 反撤销方法
    redo() {
        console.log('redo', this.step, this.canvasHistory.length);
        let ctx = this.ctx;
        if (this.step < this.canvasHistory.length - 1) {
            this.step++;
            let canvasPic = new Image();
            canvasPic.src = this.canvasHistory[this.step];
            canvasPic.onload = () => {
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                ctx.drawImage(canvasPic, 0, 0);
            };
        } else {
            console.log('已经是最新的记录了');
        }
    }
}

// 可绘制的对象，需要至少两个点的坐标
class Drawable {

    constructor(canvas) {
        this.canvas = canvas;
    }

    /**
     * 绘制需要的形状
     * @param {*} x x轴坐标
     * @param {*} y y轴坐标
     * @param {*} isDown true-触摸移动状态，false-按下的初始状态
     * @param {*} keepOrigin true-保留初始状态的点的坐标，false-不保留
     */
    draw(x, y, isDown = false, keepOrigin = false) {
        let canvas = this.canvas;
        if (isDown) {
            canvas.beginPath();
            this._drawInternal(this.canvas, this.lastX, this.lastY, x, y);
            canvas.closePath();
            if (this.fill) {
                canvas.fill();
            } else {
                canvas.stroke();
            }
        }
        if (keepOrigin) {
            if (this.lastX == undefined) {
                this.lastX = x;
            }
            if (this.lastY == undefined) {
                this.lastY = y;
            }
        } else {
            this.lastX = x;
            this.lastY = y;
        }
    }

    // 内部绘制方法，绘制具体的形状
    _drawInternal(canvas, x, y, x1, y1) {
        canvas.moveTo(x, y);
        canvas.lineTo(x1, y1);
    }

    setColor(color) {
        this.color = color;
        if (this.color != undefined) {
            this.canvas.fillStyle = this.color
            this.canvas.strokeStyle = this.color;
        }
        return this;
    }

    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        if (this.lineWidth != undefined) {
            this.canvas.lineWidth = this.lineWidth;
        }
        return this;
    }

    setFill(fill) {
        this.fill = fill;
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

    draw(x, y, isDown, keepOrigin = true) {
        super.draw(x, y, isDown, keepOrigin);
    }

    _drawInternal(canvas, x, y, x1, y1) {
        canvas.moveTo(x, y);
        canvas.lineTo(x1, y1);
    }
}

// 绘制圆形
class Circle extends Line {

    _drawInternal(canvas, x, y, x1, y1) {
        let centerX = (x + x1) / 2;
        let centerY = (y + y1) / 2;
        let radius = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2)) / 2;
        canvas.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    }
}

// 绘制矩形
class Rect extends Line {

    _drawInternal(canvas, x, y, x1, y1) {
        canvas.rect(x, y, x1 - x, y1 -y);
    }
}

// 不规则多边形或线段，至少需要2个点。
// 不可直接绘制，需要在子类中重写draw方法，将要绘制的点加到 points 数组中。
class AnyDrawable extends Line {

    _drawInternal(canvas, x, y, x1, y1) {
        if (this.points && this.points.length > 1) {
            this.points.forEach((e, index) => {
                if (index == 0) {
                    canvas.moveTo(e.x, e.y);
                } else {
                    canvas.lineTo(e.x, e.y);
                }
            });
            super.draw(canvas);
        } else {
            throw Error('多边形至少需要提供平面上2个点的坐标')
        }
    }

    add(x, y) {
        let point = new Point(x, y);
        if (!this.points) {
            this.points = [];
        }
        if (point instanceof Point && typeof point.x == 'number' && typeof point.y == 'number') {
            this.points.push(point);
        }
        return this;
    }
}

// 绘制箭头
class Arrow extends AnyDrawable {
    constructor(canvas) {
        super(canvas);
        this.setConfig({aLength:10, aSize1:3, aSize2:8});
    }

    // 设置箭头样式
    setConfig({
        aLength,
        aSize1,
        aSize2
    }) {
        if (aLength > 0) {
            this.aLength = aLength;
        }
        if (aSize1 > 0) {
            this.aSize1 = aSize1;
        }
        if (aSize2 > 0) {
            this.aSize2 = aSize2;
        }
    }

    draw(x, y, isDown, keepOrigin = true) {
        if (isDown) {
            this.setEndPoint(x, y);
        }
        if (this.startX == undefined) {
            this.startX = x;
        }
        if (this.startY == undefined) {
            this.startY = y;
        }
        super.draw(x, y, isDown, keepOrigin);
    }

    // 重置箭头绘制的样式
    setEndPoint(x1, y1) {
        let x = this.startX, y = this.startY;
        let L = this.aLength, S1 = this.aSize1, S2 = this.aSize2;
        let PI = Math.PI;
        let degree = Math.atan2(y1 - y, x - x1);

        console.log(degree / Math.PI);
        let arrowLengh = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
        if (arrowLengh < 3 * L) {
            this.points = [new Point(x, y), new Point(x1, y1)];
        } else {
            this.points = [
                new Point(x, y),
                new Point(x1 - L * Math.cos(degree) + S1 * Math.cos(PI / 2 + degree),
                    y1 - L * Math.sin(degree) + S1 * Math.sin(PI / 2 - degree)),
                new Point(x1 - L * Math.cos(degree) + S2 * Math.cos(PI / 2 + degree),
                    y1 - L * Math.sin(degree) + S2 * Math.sin(PI / 2 - degree)),
                new Point(x1, y1),
                new Point(x1 - L * Math.cos(degree) - S2 * Math.cos(PI / 2 + degree),
                    y1 - L * Math.sin(degree) - S2 * Math.sin(PI / 2 - degree)),
                new Point(x1 - L * Math.cos(degree) - S1 * Math.cos(PI / 2 + degree),
                    y1 - L * Math.sin(degree) - S1 * Math.sin(PI / 2 - degree)),
            ];
        }
    }
}
