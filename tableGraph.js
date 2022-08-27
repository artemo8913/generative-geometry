const data = {
    volvo: { 2020: 1, 2021: 2 },
    priora: { 2020: 3, 2021: 4 }
};

const proper = {
    width: 300,
    height: 300,
    axis: {
        color: 'rgba(0,120,0,1)',
        width: 5,
    },
    point: {
        color: 'rgba(17,17,17,1)',
        width: 5,
    },
    graphic: {
        color: 'red',
        width: 1,
    },
    scale: 300 / 5,
    cell: {
        minX: 0,
        miny: 0,
        maxX: 5,
        maxY: 5,
    }
};

const table = document.createElement('table');
const tr = document.createElement('tr');
const tdMark = document.createElement('td');
const td2020 = document.createElement('td');
const td2021 = document.createElement('td');
tdMark.innerHTML = 'Марка';
td2020.innerHTML = '2020';
td2021.innerHTML = '2021';
tr.appendChild(tdMark);
tr.appendChild(td2020);
tr.appendChild(td2021);
table.appendChild(tr);

for (let keyRow in data) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.innerHTML = keyRow;
    tr.appendChild(td);
    for (let keyColumn in data[keyRow]) {
        const td = document.createElement('td');
        td.innerHTML = data[keyRow][keyColumn];
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.querySelector('body')?.appendChild(table);

const canvasGraph = document.createElement('canvas');
canvasGraph.width = proper.width;
canvasGraph.height = proper.height;
const ctxGr = canvasGraph.getContext('2d');

function drawAxis() {
    ctxGr.strokeStyle = proper.axis.color;
    ctxGr.lineWidth = proper.axis.width;
    ctxGr.beginPath();
    ctxGr.moveTo(0, proper.height);
    ctxGr.lineTo(0, 0);
    ctxGr.moveTo(0, proper.height);
    ctxGr.lineTo(proper.width, proper.height);
    ctxGr.closePath();
    ctxGr?.stroke();
}

function drawPoint() {
    let gap = 1 * proper.scale;
    for (let mark in data) {
        gap *= 2;
        for (let year in data[mark]) {
            ctxGr.beginPath();
            ctxGr.arc(gap, data[mark][year] * proper.scale, proper.point.width, 0, Math.PI * 2);
            ctxGr.closePath();
            ctxGr.fillStyle = proper.point.color;
            // @ts-ignore
            ctxGr.fill();
        }
    }
}
drawAxis();
drawPoint();

document.querySelector('body')?.appendChild(canvasGraph);

