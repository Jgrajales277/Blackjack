let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias del HTML

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevo");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const puntajeHtml = document.querySelectorAll("small");

//Esta función crea una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  deck = _.shuffle(deck);
  console.log(deck);
};

crearDeck();

// Esta función permite tomar una nueva carta.

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay más cartas en la baraja";
  }

  const carta = deck.shift();

  return carta;
};

//Esta función permite retornar el valor de la carta extraída


const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor == "A" ? 11 : 10) : valor * 1;
};

//Turno de la computadora

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);

    puntajeHtml[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");

    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosMinimos === puntosComputadora) {
      alert("Nadie gana");
    } else if (puntosMinimos > 21) {
      alert("Gana la computadora");
    } else if (puntosComputadora > 21) {
      alert("Ganaste");
    } else {
      alert("Gana la computadora");
    }
  }, 30);
};
//Eventos

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);

  puntajeHtml[0].innerHTML = puntosJugador;

  //  <img class="carta" src="assets/cartas/7H.png">
  const imgCarta = document.createElement("img");

  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");

  divCartasJugador.append(imgCarta);
  
  if (puntosJugador > 21) {
      console.warn("Perdiste :S");
      btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora();
} else if (puntosJugador === 21) {
    console.warn("¡Ganaste! :D");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
}
});

btnDetener.addEventListener("click", () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
});

 btnNuevoJuego.addEventListener("click", () => {
      console.clear;
      deck = [];
      deck = crearDeck();
     puntosJugador = 0;
      puntosComputadora = 0;
      puntajeHtml[0].innerHTML = 0;
      puntajeHtml[1].innerHTML = 0;
      divCartasComputadora.innerHTML = "";
      divCartasJugador.innerHTML = "";
      btnPedir.disabled = false;
      btnDetener.disabled = false;  

     //document.location.reload();
     
     });
