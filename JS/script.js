document.addEventListener('DOMContentLoaded', () => {
    const pagina = document.getElementById('pagina');
    const hoja = document.getElementById('hoja');
    const btn = document.getElementById('btnSiguiente');

    if (!pagina || !hoja || !btn) {
        console.error('Faltan elementos en el HTML (pagina, hoja o btnSiguiente)');
        return;
    }

    const paginas = [
        pagina.innerHTML,

        `<h2>Mi Vida 🩵</h2>
         <p>Talvez esta carta no te la entregue el dia en que estabas cumpliendo años amor, me espere porque quiero vivir el momento de estar junto a ti y leer estas lindas palabras y ver la reaccion de esos ojitos tan hermosos que tienes mi vida, tambien sentir esos nervios de pensar "Sera que si le gustaron mis palabras a mi  vida", cuando aveces te doy las cartitaas corazon esa es la pregunta que suena en mi cabeza cada rato..</p>`,

        `<h2>Mi Corazon 🩵</h2>
         <p>por el miedo que tiene mi corazoncito el cual no te quiere perder y siempre te quiere ver feliz y dandome una sonrrisa la cual me mata en todo momento, me siento tan afortunado de estar a tu lado y se que muy pronto mi sueño de poder ser algo tuyo formalmente  y de celebrar tus triunfos se va a ser realidad y cuando ese sueño tendre claro que eres la mujer de mi vida y de la cual me he enamorado perdidamente y en pocas palabras... TE AMO ANGUIE 🩵 </p>`
    ];

    let actual = 0;
    let girando = false;

    function terminarGiro() {
        if (!girando) return;
        girando = false;
        hoja.classList.remove('volteando');
        hoja.innerHTML = '';
        btn.disabled = false;
        btn.textContent = actual === paginas.length - 1 ? 'Volver al inicio' : 'Siguiente';
    }

    btn.addEventListener('click', () => {
        if (girando) return;
        girando = true;
        btn.disabled = true;

        // La hoja que gira lleva el contenido actual
        hoja.innerHTML = pagina.innerHTML;

        // Debajo queda el contenido nuevo
        actual = (actual + 1) % paginas.length;
        pagina.innerHTML = paginas[actual];

        hoja.classList.add('volteando');

        // Respaldo por si animationend no se dispara
        setTimeout(terminarGiro, 1000);
    });

    hoja.addEventListener('animationend', terminarGiro);
});