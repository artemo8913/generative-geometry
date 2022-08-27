const circleCanvas = document.createElement('canvas');
const ctxC = circleCanvas.getContext('2d');
const widthC = circleCanvas.width;
const heightC = circleCanvas.height;
const circleProp = {
    count: 10,
    bgColor: 'grey',
    origin: {
        x: 50,
        y: 50,
    },
    maxRadius: 50,
    width: 2,
    angleSpeed: Math.PI / 50,
    color: 'red'
};

class Circle {
    constructor() {
        this.angle = 2 * Math.PI * Math.random();
        this.angleSpeed = circleProp.angleSpeed * Math.random();
        this.radius = circleProp.maxRadius * Math.random();
    }
    reDraw() {
        this.x = circleProp.origin.x + this.radius * Math.cos(this.angle);
        this.y = circleProp.origin.y + this.radius * Math.sin(this.angle);
        ctxC.beginPath();
        ctxC.arc(this.x, this.y, circleProp.width, 0, 2 * Math.PI);
        ctxC.closePath();
        ctxC.fillStyle = circleProp.color;
        ctxC.fill();
    }
    setAngle() {
        this.angle += this.angleSpeed;
    }
}

const circles = [];
function createCircles() {
    for (let i = 0; i < circleProp.count; i++) {
        circles.push(new Circle());
    }
}
function updateCircles() {
    circles.forEach(circle => {
        circle.setAngle();
        circle.reDraw();
    });
}

function redrawCanvasBg() {
    // @ts-ignore
    ctxC.fillStyle = circleProp.bgColor;
    // @ts-ignore
    ctxC.fillRect(0, 0, widthC, heightC);
}

function circleLoop() {
    redrawCanvasBg();
    updateCircles();
    requestAnimationFrame(circleLoop);
}
createCircles();
circleLoop();

document.querySelector('body')?.appendChild(circleCanvas);