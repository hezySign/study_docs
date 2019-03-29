// 白板
class WhiteBoard {
    constructor(canvasId, obj) {
        let {
            color = '#999999', // 画笔颜色
            lineWidth = 1, // 线条宽度
            shape = 'line', // 绘制形状: line, rect, circle, paint, arrow
            fill = false, // true-填充，false-线条
            onDrawEnd = null,
        } = { ...obj };

        if (!canvasId) {
            throw new Error('缺少参数 canvasId');
        }

        let ele = document.getElementById(canvasId);
        let ctx = ele.getContext("2d");
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        this.ele = ele;
        this.ctx = ctx;
        this.canvasWidth = ele.width;
        this.canvasHeight = ele.height;
        this.setConfig({ color, lineWidth, shape, fill, onDrawEnd });
        this.clearAll();

        ele.onmousedown = e => {
            this._onDrawStart(e);
        };
        ele.onmousemove = e => {
            this._onDrawMove(e);
        };
        ele.onmouseup = () => {
            this._onDrawEnd();
        };
        ele.onmouseleave = () => {
            this._onDrawEnd();
        }
    }

    // 画笔开始绘制
    _onDrawStart(e) {
        this.isDrawing = true;
        let drawable = null;
        let { ele, ctx, shape, fill, color, lineWidth } = this;
        let x = e.pageX - ele.offsetLeft, y = e.pageY - ele.offsetTop;
        switch (shape) {
            case 'line': drawable = new Line(ctx);
                break;
            case 'rect': drawable = new Rect(ctx);
                break;
            case 'circle': drawable = new Circle(ctx);
                break;
            case 'paint': drawable = new PaintDrawable(ctx);
                break;
            case 'arrow': drawable = new Arrow(ctx);
                break;
            case 'rainbow': drawable = new RainbowDrawable(ctx);
                break;
            default: console.error('不支持的shape', shape)
                break;
        }
        if (drawable && drawable instanceof Drawable) {
            drawable.setFill(fill).setColor(color).setLineWidth(lineWidth);
            drawable.draw(x, y, false);
            this.drawable = drawable;
        }
    }

    // 画笔移动
    _onDrawMove(e) {
        if (this.isDrawing) {
            let { ele, ctx, drawable, shape, step, canvasWidth, canvasHeight } = this;
            let x = e.pageX - ele.offsetLeft, y = e.pageY - ele.offsetTop;
            if (drawable && drawable instanceof Drawable) {
                if (drawable instanceof PaintDrawable) {
                    // 画笔绘制形式，不清除画布
                    drawable.draw(x, y, true);
                } else {
                    // 清除画布，恢复上次绘制的图形，再绘制封装好的形状
                    let canvasPic = new Image();
                    if (step >= 0) {
                        canvasPic.src = this.canvasHistory[step];
                    }
                    canvasPic.onload = () => {
                        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                        ctx.drawImage(canvasPic, 0, 0);
                        drawable.draw(x, y, true);
                    };
                }
            }
        }
    }

    // 画笔结束绘制
    _onDrawEnd() {
        if (this.isDrawing) {
            this._onPush();
        }
        this.isDrawing = false;
    }

    // 设置参数
    setConfig({
        color,
        lineWidth,
        shape,
        fill,
        onDrawEnd
    }) {
        if (color != undefined) {
            this.color = color;
            this.ctx.fillStyle = color;
            this.ctx.strokeStyle = color;
        }
        if (lineWidth != undefined) {
            this.lineWidth = lineWidth;
            this.ctx.lineWidth = lineWidth;
        }
        if (shape) {
            this.shape = shape;
        }
        this.fill = fill;
        this.onDrawEnd = onDrawEnd;
        console.log('setConfig', this)
    }

    // 记录本次绘制
    _onPush() {
        this.step++;
        if (this.step < this.canvasHistory.length) {
            this.canvasHistory.length = this.step;
        }
        this.canvasHistory.push(this.ele.toDataURL());
        if (this.onDrawEnd instanceof Function) {
            this.onDrawEnd();
        }
    }

    // 清除所有绘制
    clearAll() {
        let ctx = this.ctx;
        this.step = -1;
        this.canvasHistory = [];
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this._onPush();
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

// 点
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// 定义可绘制的对象
// 不可直接绘制，需要在子类中实现绘制方法
class Drawable {

    constructor(canvas) {
        this.canvas = canvas;
    }

    /**
     * 外部调用的绘制
     * @param {*} x x轴坐标
     * @param {*} y y轴坐标
     * @param {*} isDown true-触摸移动状态，false-按下的初始状态
     * @param {*} keepOrigin true-保留初始状态的点的坐标，false-不保留
     */
    draw(x, y, isDown = false, keepOrigin = false) {
        let canvas = this.canvas;

        // 绘制形状，具体绘制过程封装到 this._drawInternal 方法中
        canvas.save();
        if (isDown) {
            canvas.beginPath();
            this._drawInternal(isDown, this.lastX, this.lastY, x, y);
            canvas.closePath();
            if (this.fill == 1) {
                canvas.fill();
            } else {
                canvas.stroke();
            }
        } else {
            this._drawInternal(isDown, this.lastX, this.lastY, x, y);
        }
        canvas.restore();

        // 记录起始点 P 的坐标
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

    // 内部绘制方法，在子类中绘制具体的形状。
    _drawInternal(isDown, x, y, x1, y1) {
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
        this.lineWidth = Number(lineWidth);
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

// 画笔
class PaintDrawable extends Drawable {

    _drawInternal(isDown, x, y, x1, y1) {
        if (!isDown) {
            return;
        }
        let canvas = this.canvas;
        canvas.moveTo(x, y);
        canvas.lineTo(x1, y1);
    }
}

// 直线。
// 保留起始坐标点。
// 起点 P(x,y) 到 终点 P1(x1,y1)。
class Line extends Drawable {

    draw(x, y, isDown, keepOrigin = true) {
        super.draw(x, y, isDown, keepOrigin);
    }

    _drawInternal(isDown, x, y, x1, y1) {
        if (!isDown) {
            return;
        }
        let canvas = this.canvas;
        canvas.moveTo(x, y);
        canvas.lineTo(x1, y1);
    }
}

// 绘制矩形
class Rect extends Line {

    _drawInternal(isDown, x, y, x1, y1) {
        if (!isDown) {
            return;
        }
        let canvas = this.canvas;
        canvas.rect(x, y, x1 - x, y1 - y);
    }
}

// 绘制圆形
class Circle extends Line {

    _drawInternal(isDown, x, y, x1, y1) {
        if (!isDown) {
            return;
        }
        let canvas = this.canvas;
        // 圆心 (cX,cY), 半径 r
        let cX = (x + x1) / 2;
        let cY = (y + y1) / 2;
        let L = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
        let r = L / 2;
        canvas.arc(cX, cY, r, 0, Math.PI * 2, true);
    }
}

// 不规则多边形或线段，至少需要2个点。
// 不可直接绘制，需要在子类中重写draw方法，将要绘制的点加到 points 数组中。
class AnyDrawable extends Line {

    _drawInternal(isDown, x, y, x1, y1) {
        if (!isDown) {
            return;
        }
        let canvas = this.canvas;
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
        this.setConfig({ aLength: 10, aSize1: 3, aSize2: 8 });
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
        super.draw(x, y, isDown, keepOrigin);
    }

    // 重置箭头绘制的样式
    setEndPoint(x1, y1) {
        // 箭头参数：起点 P(x,y)，终点 P1(x1, y1)，方向 P→P1
        let x = this.lastX, y = this.lastY;
        let L = this.aLength; // 箭头方向上的长度
        let S1 = this.aSize1; // 箭头沿线垂直方向内侧宽度的一半
        let S2 = this.aSize2; // 箭头沿线垂直方向外侧宽度的一半
        let d = Math.atan2(y1 - y, x1 - x);// 角度的弧度值
        let PI = Math.PI;
        // let sin = Math.sin, cos = Math.cos;
        let { sin, cos } = Math;
        // 计算实际绘制的箭头比例
        let arrowLengh = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
        let scale = Math.atan(arrowLengh / 100);
        L *= scale;
        S1 *= scale;
        S2 *= scale;

        this.points = [
            new Point(x, y),
            new Point(x1 - L * cos(d) + S1 * cos(PI / 2 + d),
                y1 - L * sin(d) + S1 * sin(PI / 2 - d)),
            new Point(x1 - L * cos(d) + S2 * cos(PI / 2 + d),
                y1 - L * sin(d) + S2 * sin(PI / 2 - d)),
            new Point(x1, y1),
            new Point(x1 - L * cos(d) - S2 * cos(PI / 2 + d),
                y1 - L * sin(d) - S2 * sin(PI / 2 - d)),
            new Point(x1 - L * cos(d) - S1 * cos(PI / 2 + d),
                y1 - L * sin(d) - S1 * sin(PI / 2 - d)),
        ];
    }
}

// 彩色画笔
class RainbowDrawable extends PaintDrawable {

    constructor(canvas) {
        super(canvas);
        this.count = 0;
        this.isColorPlus = true;
        this.isWidthPlus = true;
        this.lineMin = 12;
        this.lineMax = 28;
        this.r = 0;
        this.g = 0x50;
        this.b = 0x75;
    }

    _drawInternal(isDown, x, y, x1, y1) {
        let canvas = this.canvas;
        let {r, g, b, lineWidth, lineMin, lineMax} = this;
        if (r >= 255) {
            r = 255;
            this.isColorPlus = false;
        } else if(r <= 0) {
            r = 0;
            this.isColorPlus = true;
        }

        if (!lineWidth) {
            this.lineWidth = lineMin;
        } else if (lineWidth >= lineMax) {
            lineWidth = lineMax;
            this.isWidthPlus = false;
        } else if (lineWidth <= lineMin) {
            lineWidth = lineMin;
            this.isWidthPlus = true;
        }
        this.setColor(this.rgb(r, g, b));
        this.setLineWidth(this.lineWidth);

        // 绘制形状
        if (isDown) {
            canvas.moveTo(x, y);
            canvas.lineTo(x1, y1);
        }

        if (this.isColorPlus) {
            this.r++;
        } else {
            this.r--;
        }

        if (this.isWidthPlus) {
            this.lineWidth += 0.1;
        } else {
            this.lineWidth -= 0.1;
        }
    }

    wrap(n) {
        return (n < 16 ? '0' : '') + Number(n).toString(16);
    }

    /**
     * 获取颜色值
     * @param {*} red [0, 255)
     * @param {*} green [0, 255)
     * @param {*} blue [0, 255)
     */
    rgb(red, green, blue) {
        var illegal = false;
        [red, green, blue].forEach((value) => {
            if (value < 0 || value > 255) {
                illegal = true;
            }
        });
        if (illegal) {
            console.error('参数错误', red, green, blue);
            return '#454545';
        }
        return '#' + this.wrap(red) + this.wrap(green) + this.wrap(blue);
    }
}
