const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const settingsElements = document.querySelectorAll('.settings__list-item');
const settingsInputs = document.querySelectorAll('.settings__list-item input');
const settingsEl = document.querySelector('.settings');
const settingsCloseBtnEl = document.querySelector('.settings__close-btn');
const settingsSelectEl = document.querySelector('.settings__select');

const width = innerWidth;
const height = innerHeight;

function resizeC(canvas) {
    canvas.width = width;
    canvas.height = height;
}
resizeC(canvas);
const bgColor = 'rgba(40,40,40,0.1)';
const selectedFigureIndex = 0;
const figuresSettings = [
    {
        width,
        height,
        bgColor,
        cw: width / 4,
        ch: height / 2,
        angleStartOffset: 0,
        hardResetTime: 0,
        startDirectionsCount: 12,
        startAngleBetweenDeg: 43,
        angleDeg: 60,
        amount: 300,
        color: 'hsl(120,100%,50%)',
        antWidth: 2,
        antHeight: 2,
        speed: 40,
        maxAge: 90,
        extraAge: 20,
        delayBeforeCreate: 40,
        delayBetweenCreate: 0,
        stepLength: 200,
    },
    {
        width,
        height,
        bgColor,
        cw: width / 4 * 2,
        ch: height / 2,
        angleStartOffset: 60,
        hardResetTime: 0,
        startDirectionsCount: 12,
        startAngleBetweenDeg: 43,
        angleDeg: 60,
        amount: 300,
        color: 'hsl(120,100%,50%)',
        antWidth: 2,
        antHeight: 2,
        speed: 40,
        maxAge: 10,
        extraAge: 40,
        delayBeforeCreate: 40,
        delayBetweenCreate: 10,
        stepLength: 200,
    },
];
const updateFiguresFunctions = [];
function drawFigures() {
    figuresSettings.forEach(figure => {
        updateFiguresFunctions.push(createGeometryFigure(ctx, figure));
    });
}
function updateFigure(index) {
    updateFiguresFunctions[index](figuresSettings[index]);
}
drawFigures();

Array.from(settingsInputs).forEach(element => {
    element.value = element.nextElementSibling.innerHTML = figuresSettings[selectedFigureIndex][element.id];
    element?.addEventListener('input', (e) => {
        figuresSettings[selectedFigureIndex][element.id] = Number(e.target.value);
        element.nextElementSibling.innerHTML = e.target.value;
        updateFigure(selectedFigureIndex);
    });
});

settingsCloseBtnEl?.addEventListener('click', () => {
    Array.from(settingsElements).forEach(element => element.style.display = element.style.display === 'none' ? 'flex' : 'none');
});