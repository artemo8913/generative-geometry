const canvasWeb = document.createElement('canvas');
const ctxW = canvasWeb.getContext('webgl');

// WebGL - Fundamentals
// from https://webglfundamentals.org/webgl/webgl-fundamentals.html
"use strict";

/** 
* Функция хелпер которая принимает контекст webgl, тип шейдера (вершинный/) и сам glsl код и выплевывает ссылку на шейдер который потом прокидывается в программу.
*/
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

/**
* Функция хелпер которая позволяет создать программу из шейдеров. Потом эту программу мы будем прокидывать в webgl, чтоб он понимал что вообще делать в этом мире.
*/
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

// Наш вершинный шейдер, будет работать на благо вершин
const vertexShaderCode = `
// атрибут, который будет получать данные которые мы передали.
attribute vec4 a_position;
 
// все шейдеры имеют функцию main
void main() {
 
  // gl_Position - специальная переменная вершинного шейдера,
  // которая отвечает за установку положения
  gl_Position = a_position;
}`

// Наш фрагментный, будет работать на закраску пикселей
const fragmentShaderCode = `
// фрагментные шейдеры не имеют точности по умолчанию, поэтому нам необходимо её
// указать. mediump подойдёт для большинства случаев. Он означает "средняя точность"
precision mediump float;
 
void main() {
  // gl_FragColor - специальная переменная фрагментного шейдера.
  // Она отвечает за установку цвета.
  gl_FragColor = vec4(1, 0, 0, 1); // вернёт красный
}
`

function main() {
  // Получаем webgl контекст из canvas элемента.
  const canvas = document.getElementById("c");
  const gl = canvas.getContext("webgl");


  // Создаем шейдеры и получаем на них ссылки
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

  // Прокидываем ссылки в программу и получаем на выход программу.
  const program = createProgram(gl, vertexShader, fragmentShader);



  // Получаем ссылку на атрибут, чтоб в будущем в него прокидывать данные. Ссылку можно получить, даже если программу не подключили контексту.
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");


  // Какая-та штука которая активирует атрибут, и зачем его активировать я хз. Но если не сделать, ничего работать не будет. И активировать его можно только если подключили программу.
  gl.enableVertexAttribArray(positionAttributeLocation);




  // Создаем буффер. Буффер нужен чтоб было куда прокидывать данные для атрибута. Фишка в том, что мы можем в 1 атрибут прокидывать разные буфферы. То есть таким образом рисовать разные фигуры использую 1 webgl программу.
  const positionBuffer = gl.createBuffer();

  // А тут мы тип запрашиваем пронстранство в памяти и привызываем его к буфферу.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // массив координат/вершин, чтоб отрисовать будущий треугольник. 
  const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
  ];
  
  // Заливаем данные в буфер. STATIC_DRAW означает, что массив в буфере никак мутироваться не будет и я хз можно ли их как-то мутировать?
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Специальный хелпер который позволяет отресайзить канвас. 
  
  // Аля viewport в SVG.
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Очищаем канвас, даже если он чистый.
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
   // Подключаем программу к контексту
  gl.useProgram(program);
  
   // Тут мы указываем как атрибуту парсить наши данные которые мы ниже прокинем
  const size = 2;          // сколько чисел нужно, чтоб получить одну вершину
  const type = gl.FLOAT;   // тип данных, всегда выбираем float
  const normalize = false; // просим не конветировать автоматически наши данные от -1 до 1. Ибо последствия могут быть не предсказуемые
  const stride = 0;        //  0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
  const offset = 0;        // начинать с начала буфера
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);
 
 
  // Наконец-то вызываем рисование фигуры
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

main();