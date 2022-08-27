// @ts-nocheck
let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = innerWidth,
    height = canvas.height = innerHeight,
    particles = [],
    props = {
        bgColor: 'rgba(17,17,17,1)',
        paricleColor: 'rgba(140,0,0,1)',
        particleRadius: 2,
        particleCount: 200,
        particleMaxVelocity: 1,
        lineMaxLength: 100,
        lineWidth: 2,
        lineColor: 'rgba(140,0,0,1)',
    };

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.velocityX = props.particleMaxVelocity * (Math.random() * 2 - 1);
        this.velocityY = props.particleMaxVelocity * (Math.random() * 2 - 1);
    };
    reDraw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, props.particleRadius, 0, Math.PI * 2);
        ctx.closePath();
        // @ts-ignore
        ctx.fillStyle = props.paricleColor;
        // @ts-ignore
        ctx.fill();
    };
    setPosition() {
        this.x + this.velocityX > width && this.velocityX > 0
            || this.x + this.velocityX < 0 && this.velocityX < 0
            ? this.velocityX *= -1
            : null;
        this.y + this.velocityY > height && this.velocityY > 0
            || this.y + this.velocityY < 0 && this.velocityY < 0
            ? this.velocityY *= -1
            : null;
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}

document.querySelector('body').appendChild(canvas);

window.onresize = () => {
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;
};

function redrawBg() {
    // @ts-ignore
    ctx.fillStyle = props.bgColor;
    // @ts-ignore
    ctx.fillRect(0, 0, width, height);
}
function redrawParicles() {
    particles.forEach(particle => {
        particle.reDraw();
        particle.setPosition();
    });
}
function drawLines() {
    let x1, x2, y1, y2, opacity, length = 0;
    particles.forEach(particle1 => {
        particles.forEach(particle2 => {
                x1 = particle1.x;
                y1 = particle1.y;
                x2 = particle2.x;
                y2 = particle2.y;
                length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                if (length <= props.lineMaxLength) {
                    opacity = 1 - length / props.lineMaxLength;
                    ctx.lineWidth = props.lineWidth;
                    ctx.strokeStyle = props.lineColor.replace(/\d+\.?\d*\)$/, `${opacity})`);
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
        });
    });
}
function loop() {
    redrawBg();
    redrawParicles();
    drawLines();
    requestAnimationFrame(loop);

}
function init() {
    for (let i = 0; i < props.particleCount; i++) {
        particles.push(new Particle);
    }
    loop();
}
init();