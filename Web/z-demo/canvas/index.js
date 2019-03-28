// 白板
class WhiteBoard {
    constructor({
        canvasId = null, // canvasId
        color = '#999999', // 画笔颜色
        lineWidth = 1, // 线条宽度
        shape = 'line', // 绘制形状: line, rect, circle, any, arrow
        onDrawEnd = null,
    }) {

        let ele = document.getElementById(canvasId);
        let ctx = ele.getContext("2d");
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        this.ctx = ctx;
        this.canvasHistory = [];
        this.step = -1;
        this.canvasWidth = ele.width;
        this.canvasHeight = ele.height;
        this.onDrawEnd = onDrawEnd;

        let drawable = null;
        ele.onmousedown = e => {
            this.isDrawing = true;
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
            }
            if (drawable && drawable instanceof Drawable) {
                drawable.draw(x, y, false);
            }
        };
        ele.onmousemove = e => {
            if (this.isDrawing) {
                let x = e.pageX - ele.offsetLeft, y = e.pageY - ele.offsetTop;
                if (drawable && drawable instanceof Drawable) {
                    if (shape && shape != 'any') {
                        let canvasPic = new Image();
                        canvasPic.src = this.canvasHistory[this.step];
                        canvasPic.onload = () => {
                            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                            ctx.drawImage(canvasPic, 0, 0);
                            drawable.draw(x, y, true);
                        };
                    } else {
                        drawable.draw(x, y, true);
                    }
                }
            }
        };
        ele.onmouseup = () => {
            this.isDrawing = false;
            this.onPush(ele);
        };
        ele.mouseleave = () => {
            this.isDrawing = false;
            this.onPush(ele);
        }

        this.onPush(ele);
    }

    onPush(ele) {
        this.step++;
        if (this.step < this.canvasHistory.length) {
            this.canvasHistory.length = this.step;
        }
        this.canvasHistory.push(ele.toDataURL());

        if (this.onDrawEnd instanceof Function) {
            this.onDrawEnd(ctx);
        }
        console.log('onPush', this.step, this.canvasHistory.length);
    }

    clearAll() {
        let ctx = this.ctx;
        this.step = -1;
        this.canvasHistory = [];
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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
        this.canvas.lineJoin = 'round';
        this.canvas.lineCap = 'round';
    }

    /**
     * 绘制需要的形状
     * @param {*} x x轴坐标
     * @param {*} y y轴坐标
     * @param {*} isDown true-触摸移动状态，false-按下的初始状态
     * @param {*} keepOrigin true-保留初始状态的点的坐标，false-不保留
     */
    draw(x, y, isDown, keepOrigin = false) {
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

    draw(x, y, isDown, keepOrigin = false) {
        super.draw(x, y, isDown, true);
    }

    _drawInternal(canvas, x, y, x1, y1) {
        canvas.moveTo(x, y);
        canvas.lineTo(x1, y1);
    }
}

// 绘制圆形
class Circle extends Drawable {

    draw(x1, y1, isDown) {
        let canvas = this.canvas;
        if (isDown) {
            let x = this.x, y = this.y;
            canvas.beginPath();
            canvas.moveTo(x, y);
            let centerX = (x + x1) / 2;
            let centerY = (y + y1) / 2;
            let radius = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2)) / 2;
            canvas.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            if (this.fill) {
                canvas.fill();
            } else {
                canvas.stroke();
            }
        }
        if (this.x == undefined) {
            this.x = x1;
        }
        if (this.y == undefined) {
            this.y = y1;
        }
    }
}

// 绘制矩形
class Rect extends Drawable {

    draw(x1, y1, isDown) {
        let canvas = this.canvas;
        if (isDown) {
            let x = this.x, y = this.y;
            canvas.beginPath();
            canvas.rect(x, y, x1 - x, y1 -y);
            if (this.fill) {
                canvas.fill();
            } else {
                canvas.stroke();
            }
        }
        if (this.x == undefined) {
            this.x = x1;
        }
        if (this.y == undefined) {
            this.y = y1;
        }
    }
}

// 绘制不规则多边形或线段，至少需要2个点
class AnyDrawable extends Drawable {

    draw(x1, y1, isDown) {
        let canvas = this.canvas;
        if (isDown) {
            let x = this.x, y = this.y;
            canvas.beginPath();
            canvas.rect(x, y, x1 - x, y1 -y);
            if (this.fill) {
                canvas.fill();
            } else {
                canvas.stroke();
            }
        }
        if (this.x == undefined) {
            this.x = x1;
        }
        if (this.y == undefined) {
            this.y = y1;
        }
    }

    draw(canvas) {
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
        let degree = x != x1 ? Math.atan((y1 - y) / (x1 - x)) :
            y > y1 ? 3 * PI / 2 : PI / 2;

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
            new Point(x, y),
        ];
        return this;
    }
}
