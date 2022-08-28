//настройку цвета сделать
//подправить инпуты, ввод точных данных также должен быть удобен
//описание на гит хабе добавить
function createGeometryFigure(
    ctx,
    {
        width,
        height,
        bgColor,
        cw,
        ch,
        angleStartOffset,
        hardResetTime,
        startDirectionsCount,
        startAngleBetweenDeg,
        angleDeg,
        amount,
        color,
        antWidth,
        antHeight,
        speed,
        maxAge,
        extraAge,
        delayBeforeCreate,
        delayBetweenCreate,
        stepLength,
    }) {
    class Ant {
        constructor() {
            this.init();
        }
        init() {
            this.pos = {
                x: cw - antWidth / 2,
                y: ch - antHeight / 2
            };
            this.color = color;
            this.maxAge = maxAge + extraAge * Math.random();
            this.age = 0;
            this.stepLength = 0;
            this.delayBeforeCreate = delayBeforeCreate * Math.random();
            this.directionAngle = Math.round(Math.random() * (startDirectionsCount - 1)) * (angleDeg + startAngleBetweenDeg) + angleStartOffset;
        }
        reDraw() {
            ctx.fillStyle = `hsl(${Math.abs(this.pos.x + this.pos.y - cw - ch)},50%,50%)`;
            ctx?.fillRect(this.pos.x, this.pos.y, antWidth, antHeight);
        }
        makeStep() {
            if (0 < this.delayBeforeCreate) {
                this.delayBeforeCreate--;
                return;
            }
            this.age++;
            this.stepLength++;
            if (this.stepLength >= stepLength / 10) {
                this.stepLength = 1;
                this.directionAngle += Math.random() > 0.5 ? angleDeg : -angleDeg;
            }
            if (this.age >= this.maxAge + delayBetweenCreate) {
                this.init();
                return;
            }
            if (this.age >= this.maxAge) {
                return;
            }
            this.pos.x += speed / 10 * Math.cos(this.directionAngle * Math.PI / 180);
            this.pos.y += speed / 10 * Math.sin(this.directionAngle * Math.PI / 180);
        }
    }

    let timer = 0;
    let ants = setAmountOfAnts(amount);
    app();
    redrawBgHard();

    function setAmountOfAnts(n) {
        const array = [];
        for (let i = 0; i < n; i++) {
            array.push(new Ant());
        }
        return array;
    }
    function updateAnts() {
        ants.forEach(ant => {
            ant.reDraw();
            ant.makeStep();
        });
    }
    function resetAnts() {
        ants.forEach(ant => {
            ant.reDraw();
            ant.init();
        });
    }
    function redrawBg() {
        ctx.fillStyle = bgColor;
        ctx?.fillRect(0, 0, width, height);
    }
    function redrawBgHard() {
        const rgbArr = bgColor.split(',');
        const rgbStr = rgbArr[0] + rgbArr[1] + rgbArr[2] + ')';
        ctx.fillStyle = rgbStr;
        ctx?.fillRect(0, 0, width, height);
    }
    function app() {
        redrawBg();
        timer++;
        hardResetTime > 0 && timer % hardResetTime === 0 ? resetAnts() : updateAnts();
        requestAnimationFrame(app);
    }
    function update(newSettings) {
        width = newSettings.width;
        height = newSettings.height;
        bgColor = newSettings.bgColor;
        cw = newSettings.cw;
        ch = newSettings.ch;
        angleStartOffset = newSettings.angleStartOffset;
        hardResetTime = newSettings.hardResetTime;
        startDirectionsCount = newSettings.startDirectionsCount;
        startAngleBetweenDeg = newSettings.startAngleBetweenDeg;
        angleDeg = newSettings.angleDeg;
        amount = newSettings.amount;
        color = newSettings.color;
        antWidth = newSettings.antWidth;
        antHeight = newSettings.antHeight;
        speed = newSettings.speed;
        maxAge = newSettings.maxAge;
        extraAge = newSettings.extraAge;
        delayBeforeCreate = newSettings.delayBeforeCreate;
        delayBetweenCreate = newSettings.delayBetweenCreate;
        stepLength = newSettings.stepLength;
        ants = setAmountOfAnts(amount);
    }
    return update;
}