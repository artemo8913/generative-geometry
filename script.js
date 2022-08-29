const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const settingsElements = document.querySelectorAll('.settings__list-item');
const settingsInputs = document.querySelectorAll('.settings__list-item input');
const settingsCloseBtnEl = document.querySelector('.settings__close-btn');
const settingsSelectEl = document.querySelector('.settings__select');
const width = innerWidth;
const height = innerHeight;
const bgColor = 'rgba(40,40,40,0.1)';
let selectedFigureIndex = 0;
const updateFiguresFunctions = [];
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
        delayBeforeCreate: 10,
        delayBetweenCreate: 10,
        stepLength: 200,
    },
    {
        width,
        height,
        bgColor,
        cw: width / 10 * 6,
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

resizeCanvas(canvas, width, height);
drawFigures(figuresSettings);
createOptions(figuresSettings);

settingsSelectEl?.addEventListener('input', () => {
    selectedFigureIndex = settingsSelectEl.options.selectedIndex;
    Array.from(settingsInputs).forEach(element => resetSettingsValues(element, selectedFigureIndex));
});
Array.from(settingsInputs).forEach(element => {
    resetSettingsValues(element, selectedFigureIndex);
    element?.addEventListener('input', (e) => {
        figuresSettings[selectedFigureIndex][element.id] = Number(e.target.value);
        element.nextElementSibling.innerHTML = e.target.value;
        updateFigure(selectedFigureIndex);
    });
});
settingsCloseBtnEl?.addEventListener('click', () => {
    Array.from(settingsElements).forEach(element => element.style.display = element.style.display === 'none' ? 'flex' : 'none');
});
function createOptions(array){
    const count = array.length;
    for(let i = 0; i < count; i++){
        const option = document.createElement('option');
        option.innerHTML = `Фигура ${i + 1}`;
        settingsSelectEl.appendChild(option);
    }
}
function resetSettingsValues(element, selectedFigureIndex){
    element.value = element.nextElementSibling.innerHTML = figuresSettings[selectedFigureIndex][element.id];
}
function resizeCanvas(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}
function drawFigures(figuresSettings) {
    figuresSettings.forEach(figure => {
        updateFiguresFunctions.push(createGeometryFigure(ctx, figure));
    });
}
function updateFigure(index) {
    updateFiguresFunctions[index](figuresSettings[index]);
}