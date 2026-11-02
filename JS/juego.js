const tarjeta  = document.getElementById('tarjeta');
const contador = document.getElementById('contador');
const pregunta = document.getElementById('pregunta');
const btnSi    = document.getElementById('btnSi');
const btnNo    = document.getElementById('btnNo');

/* ==========================================
   AQUÍ PONES LOS TEXTOS DE LAS PREGUNTAS
   ========================================== */
const preguntas = [
    '¿Dime un momento o algo que has querido pasar junto a mi corazon? 😌',
    '¿Dime cual es tu comida favoritaaa mi corazon? 😭',
    '¿Crees que tu mami si me daria permiso de poder ser tu novio amor ? 🧐',
    '¿Mi vida si dentro de poco, te dijera "Puedo ser tu novio ?" que me diras..?'
];

/* Textos que va mostrando el botón "No" en la pregunta 4 */
const textosNo = [
    'No',
    '¿Segura?',
    'Piénsalo bien...',
    'Última oportunidad',
    'Anda, di que sí',
    'Por favor 🥺'
];

let actual = 0;      // pregunta actual (0 a 3)
let nivel  = 0;      // cuántas veces ha pulsado "No" en la pregunta 4
const MAX_NIVEL = textosNo.length;   // al llegar aquí, el "Sí" ocupa toda la pantalla

function mostrarPregunta() {
    contador.textContent = `Pregunta ${actual + 1} de ${preguntas.length}`;
    pregunta.textContent = preguntas[actual];
}

function terminar() {
    btnSi.classList.remove('pantalla-completa');
    btnSi.style.transform = '';
    tarjeta.classList.add('terminado');
}

/* Botón SÍ */
btnSi.addEventListener('click', () => {
    if (actual < preguntas.length - 1) {
        actual++;
        mostrarPregunta();
    } else {
        terminar();   // respondió sí a la última
    }
});

/* Botón NO */
btnNo.addEventListener('click', () => {
    const esUltima = actual === preguntas.length - 1;

    if (!esUltima) {
        // Preguntas 1 a 3: el "No" también avanza
        actual++;
        mostrarPregunta();
        return;
    }

    // Pregunta 4: el "No" no deja decir que no, solo agranda el "Sí"
    nivel++;

    tarjeta.classList.remove('sacudir');
    void tarjeta.offsetWidth;
    tarjeta.classList.add('sacudir');

    if (nivel >= MAX_NIVEL) {
        btnSi.style.transform = '';
        btnSi.classList.add('pantalla-completa');
    } else {
        btnSi.style.transform = `scale(${1 + nivel * 0.9})`;
        btnNo.textContent = textosNo[nivel];
    }
});

/* ---------- Corazones flotando de fondo ---------- */
const contCorazones = document.getElementById('corazones');
const colores = ['#ff6ff8', '#3ab5ee', '#2397f7', '#181ab3', '#a5e6fa'];

for (let i = 0; i < 22; i++) {
    const c = document.createElement('span');
    c.className = 'corazon';
    c.style.left = Math.random() * 100 + '%';
    c.style.setProperty('--t', (14 + Math.random() * 28) + 'px');
    c.style.setProperty('--c', colores[Math.floor(Math.random() * colores.length)]);
    c.style.setProperty('--d', (8 + Math.random() * 8) + 's');
    c.style.setProperty('--r', (-Math.random() * 12) + 's');
    contCorazones.appendChild(c);
}

mostrarPregunta();