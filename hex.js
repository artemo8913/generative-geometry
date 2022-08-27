//как задать и изменять скорость
//настройку цвета сделать
//выбор направлений (не только задавать кол-во направлений при старте)
//вариант синхронного/одновременного запуска точек, при условии, что их период жизни отличается. Т.е. принудительно перезагружать. А то в какой-то момент всё в кашу превращается
const c = document.createElement('canvas');
const cCtx = c.getContext('2d');
const width = innerWidth;
const height = innerHeight;
const settings = {
    w: width,
    h: height,
    bgColor: 'rgba(40,40,40,0.1)',
    cw: width / 4,
    ch: height / 2,
    angleStartOffset: 0,
    ant: {
        startDirections: 12,
        spaceBetweenDeg: 43,
        angleDeg: 60,
        amount: 300,
        color: 'hsl(120,100%,50%)',
        w: 2,
        h: 2,
        speed: 4,
        maxAge: {value: 90, extraValue: 20},
        delayBeforeCreate: 10,
        stepLength: 20,
        maxResetPause: 10,
    }
};
class Ant {
    constructor() {
        this.pos = {
            // x: 10,
            x: settings.cw - settings.ant.w / 2,
            y: settings.ch - settings.ant.h / 2
        };
        this.color = settings.ant.color;
        this.maxAge = settings.ant.maxAge.value + settings.ant.maxAge.extraValue * Math.random();
        this.age = 0;
        this.length = 0;
        this.directionAngle = Math.round(Math.random() * (settings.ant.startDirections - 1)) * (settings.ant.angleDeg + settings.ant.spaceBetweenDeg) + settings.angleStartOffset;
    }
    init() {
        this.pos = {
            // x: 10,
            x: settings.cw - settings.ant.w / 2,
            y: settings.ch - settings.ant.h / 2
        };
        this.color = settings.ant.color;
        this.maxAge = settings.ant.maxAge.value + settings.ant.maxAge.extraValue * Math.random();
        this.age = 0;
        this.length = 0;
        this.directionAngle = Math.round(Math.random() * (settings.ant.startDirections - 1)) * (settings.ant.angleDeg + settings.ant.spaceBetweenDeg) + settings.angleStartOffset;
    }
    reDraw() {
        cCtx.fillStyle = `hsl(${Math.abs(this.pos.x + this.pos.y - settings.cw - settings.ch)},50%,50%)`;
        // cCtx.fillStyle = `hsl(${this.age},50%,50%)`;
        cCtx?.fillRect(this.pos.x, this.pos.y, settings.ant.w, settings.ant.h);
    }
    makeStep() {
        this.length++;
        this.age++;
        if (this.length >= settings.ant.stepLength) {
            this.length = 1;
            this.directionAngle += Math.random() > 0.5 ? settings.ant.angleDeg : -settings.ant.angleDeg;
        }
        if (this.age >= this.maxAge + settings.ant.delayBeforeCreate) {
            this.init();
            return;
        }
        if (this.age >= this.maxAge) {
            return;
        }
        this.pos.x += settings.ant.speed * Math.cos(this.directionAngle * Math.PI / 180);
        this.pos.y += settings.ant.speed * Math.sin(this.directionAngle * Math.PI / 180);
    }
}
function setAmountOfAnts(n) {
    ants = [];
    for (let i = 0; i < n; i++) {
        ants.push(new Ant());
    }
}
function updateAnts() {
    ants.forEach(ant => {
        ant.reDraw();
        ant.makeStep();
    });
}
function resizeC() {
    c.width = settings.w;
    c.height = settings.h;
}
function redrawBg() {
    cCtx.fillStyle = settings.bgColor;
    cCtx?.fillRect(0, 0, settings.w, settings.h);
}
function app() {
    redrawBg();
    updateAnts();
    requestAnimationFrame(app);
}

let ants = [];
const ant = new Ant();
setAmountOfAnts(settings.ant.amount);
resizeC();
app();
document.addEventListener('resize', resizeC);
document.querySelector('body')?.appendChild(c);

const cwEl = document.querySelector('#cw');
const chEl = document.querySelector('#ch');
const startDirectionsEl = document.querySelector('#startDirections');
const angleStartOffsetEl = document.querySelector('#angleStartOffset');
const spaceBetweenDegEl = document.querySelector('#spaceBetweenDeg');
const angleDegEl = document.querySelector('#angleDeg');
const amountEl = document.querySelector('#amount');
const aWEl = document.querySelector('#aW');
const aHEl = document.querySelector('#aH');
const speedEl = document.querySelector('#speed');
const delayBeforeCreateEl = document.querySelector('#delayBeforeCreate');
const maxAgeEl = document.querySelector('#maxAge');
const extraAgeEl = document.querySelector('#extraAge');
const stepLengthEl = document.querySelector('#stepLength');

cwEl.value = cwEl.nextElementSibling.innerHTML = settings.cw;
chEl.value = chEl.nextElementSibling.innerHTML = settings.ch;
startDirectionsEl.value = startDirectionsEl.nextElementSibling.innerHTML = settings.ant.startDirections;
angleStartOffsetEl.value = angleStartOffsetEl.nextElementSibling.innerHTML = settings.angleStartOffset;
spaceBetweenDegEl.value = spaceBetweenDegEl.nextElementSibling.innerHTML = settings.ant.spaceBetweenDeg;
angleDegEl.value = angleDegEl.nextElementSibling.innerHTML = settings.ant.angleDeg;
amountEl.value = amountEl.nextElementSibling.innerHTML = settings.ant.amount;
aWEl.value = aWEl.nextElementSibling.innerHTML = settings.ant.w;
aHEl.value = aHEl.nextElementSibling.innerHTML = settings.ant.h;
speedEl.value = speedEl.nextElementSibling.innerHTML = settings.ant.speed;
delayBeforeCreateEl.value = delayBeforeCreateEl.nextElementSibling.innerHTML = settings.ant.delayBeforeCreate;
maxAgeEl.value = maxAgeEl.nextElementSibling.innerHTML = settings.ant.maxAge.value;
extraAgeEl.value = extraAgeEl.nextElementSibling.innerHTML = settings.ant.maxAge.extraValue;
stepLengthEl.value = stepLengthEl.nextElementSibling.innerHTML = settings.ant.stepLength;

cwEl?.addEventListener('input', (e) => {
    settings.cw = Number(e.target.value);
    cwEl.nextElementSibling.innerHTML = e.target.value;
});
chEl?.addEventListener('input', (e) => {
    settings.ch = Number(e.target.value);
    chEl.nextElementSibling.innerHTML = e.target.value;
});
angleStartOffsetEl?.addEventListener('input', (e) => {
    settings.angleStartOffset = Number(e.target.value);
    angleStartOffsetEl.nextElementSibling.innerHTML = e.target.value;
});
startDirectionsEl?.addEventListener('input', (e) => {
    settings.ant.startDirections = Number(e.target.value);
    startDirectionsEl.nextElementSibling.innerHTML = e.target.value;
});
spaceBetweenDegEl?.addEventListener('input', (e) => {
    settings.ant.spaceBetweenDeg = Number(e.target.value);
    spaceBetweenDegEl.nextElementSibling.innerHTML = e.target.value;
});
angleDegEl?.addEventListener('input', (e) => {
    settings.ant.angleDeg = Number(e.target.value);
    angleDegEl.nextElementSibling.innerHTML = e.target.value;
});
amountEl?.addEventListener('input', (e) => {
    settings.ant.amount = Number(e.target.value);
    amountEl.nextElementSibling.innerHTML = e.target.value;
    setAmountOfAnts(e.target.value);
});
aWEl?.addEventListener('input', (e) => {
    settings.ant.w = Number(e.target.value);
    aWEl.nextElementSibling.innerHTML = e.target.value;
});
aHEl?.addEventListener('input', (e) => {
    settings.ant.h = Number(e.target.value);
    aHEl.nextElementSibling.innerHTML = e.target.value;
});
speedEl?.addEventListener('input', (e) => {
    settings.ant.speed = Number(e.target.value);
    speedEl.nextElementSibling.innerHTML = e.target.value;
});
delayBeforeCreateEl?.addEventListener('input', (e) => {
    settings.ant.delayBeforeCreate = Number(e.target.value);
    delayBeforeCreateEl.nextElementSibling.innerHTML = e.target.value;
});
maxAgeEl?.addEventListener('input', (e) => {
    settings.ant.maxAge.value = Number(e.target.value);
    maxAgeEl.nextElementSibling.innerHTML = e.target.value;
});
extraAgeEl?.addEventListener('input', (e) => {
    settings.ant.maxAge.extraValue = Number(e.target.value);
    extraAgeEl.nextElementSibling.innerHTML = e.target.value;
});
stepLengthEl?.addEventListener('input', (e) => {
    settings.ant.stepLength = Number(e.target.value);
    stepLengthEl.nextElementSibling.innerHTML = e.target.value;
});