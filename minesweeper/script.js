/*
 * description: Lo scopo dell'attività è quello replicare il gioco del campo
 *              minato tramite l'uso di una tabella e il conteggio delle celle
 *              per ogni tipo.
 * author: Garonzi Marcello
 */

const table = $("#table");
const marcatori = {
  A: $("#marcatore-a"),
  B: $("#marcatore-b"),
};
var counterB = 0;
var elements = [];
var width = 10;
var height = 10;
const riempimento = 0.1;

async function genera(form) {
  // Prendi gli input
  const data = new FormData(form);
  if (data.get("width")) width = data.get("width");
  if (data.get("height")) height = data.get("height");

  // Resetta tutto
  table.html("");
  table.attr("class", "");
  counterB = 0;
  elements = [];
  marcatori.A.text(0);
  marcatori.B.text(0);

  // Genera le celle
  for (let y = 0; y < height; y++) {
    // Riga nella tabella
    const tr = $("<tr></tr>");
    table.append(tr);

    // Riga nella matrice
    const row = [];
    elements.push(row);

    for (let x = 0; x < width; x++) {
      // Crea il td
      const td = $("<td></td>");
      tr.append(td);
      row.push(td);

      // Genera e imposta marcatore
      const marcatore = Math.random() < riempimento ? "A" : "B";
      td.attr("class", marcatore);
      td.data("marcatore", marcatore);

      // Gestione eventi sul td
      td.click(() => clickHandler(td, x, y));
      td.contextmenu((event) => {
        event.preventDefault();
        toggleFlag(td);
      });
      randomizeTdAnimation(td);

      // Conta i marcatori B per sapere quando ha vinto
      if (marcatore === "B") counterB++;
    }
  }
}

var callStack = 0;

function clickHandler(td, x, y) {
  // Impedisco alla cella di essere cliccata nuovamente
  td.unbind();

  // Se è contrassegnata da una bandiera la rimuovo
  removeFlag(td);

  // Chiamo le varie azioni
  callStack++;
  click1(td);
  click2(td, x, y);
  click3(td, x, y);
  callStack--;

  // Controllo se è in stato di sconfitta o vittoria
  // Richiamo la funzione solo se sono stati gestiti gli eventi su tutte le celle in questione
  if (callStack == 0) checkWin();
}

// l'incremento del contatore relativo al marcatore associato
function click1(td) {
  // rivela il colore della casella
  td.attr("class", td.attr("class") + " reveal");
  // incrementa contatore marcatore
  const marcatore = td.data("marcatore");
  marcatori[marcatore].text(parseInt(marcatori[marcatore].text()) + 1);
}

// la comparsa, nella cella, di un numero corrispondente alla quantità di celle
// che la circondano (anche in diagonale) che contengono il marcatore A
function click2(td, x, y) {
  if (td.data("marcatore") == "B") {
    let count = 0;
    for (let tY = y - 1; tY <= y + 1; tY++) {
      for (let tX = x - 1; tX <= x + 1; tX++) {
        // se il td contiene il marcatore A
        if (elements[tY]?.[tX]?.data("marcatore") == "A") count++;
      }
    }
    td.text(count);
    td.data("surrounding", count);

    // imposto il colore del numero
    td.attr("class", td.attr("class") + " n" + count);
  }
}

// nel caso il marcatore sia B, inoltre ogni cella adiacente (non in diagonale)
// se contiene il marcatore B dovrà comportarsi come se fosse stata cliccata
function click3(td, x, y) {
  if (td.data("marcatore") == "B") {
    // Se contiene celle A a fianco
    if (td.data("surrounding") != 0) return;
    // clicca le celle a fianco
    if (td.attr("class").trim().split(" ").includes("B")) {
      if (x > 0) {
        removeFlag(elements[y][x - 1]);
        elements[y][x - 1].click();
      }
      if (x < width - 1) {
        removeFlag(elements[y][x + 1]);
        elements[y][x + 1].click();
      }
      if (y > 0) {
        removeFlag(elements[y - 1][x]);
        elements[y - 1][x].click();
      }
      if (y < height - 1) {
        removeFlag(elements[y + 1][x]);
        elements[y + 1][x].click();
      }
    }
  }
}

function checkWin() {
  // Controlla se ha vinto o perso
  if (marcatori.A.text() == 1) {
    setTimeout(() => {
      document.getElementById("lost-dialog").showModal();
    }, 1000);
  } else if (marcatori.B.text() == counterB) {
    table.attr("class", table.attr("class") + " win");
    setTimeout(() => {
      document.getElementById("win-dialog").showModal();
    }, 1000);
  } else return; // Né vinto, né perso: non disabilitare i click

  // Disabilita i click, sia che il giocatore vinca o perda
  elements.forEach((row) => {
    row.forEach((td) => {
      if (td.data("marcatore") == "A")
        td.attr("class", td.attr("class") + " reveal");
      td.unbind();
    });
  });
}

// td animation randomizer
function randomizeTdAnimation(td) {
  const r = Math.floor(Math.random() * 180 - 90);
  const x = Math.floor(Math.random() * 60 - 30);
  const d = Math.floor(Math.random() * 500 + 500);
  td.css({
    "--r": r + "deg",
    "--x": x + "px",
    "--d": d + "ms",
  });
}

/**************************************************/
// Flag functions
function toggleFlag(td) {
  const classList = td.attr("class").trim().split(" ");
  const susPos = classList.indexOf("sus");
  if (susPos > -1) {
    classList.splice(susPos, 1);
  } else {
    classList.push("sus");
  }
  td.attr("class", classList.join(" "));
}

function addFlag(td) {
  const classList = td.attr("class").trim().split(" ");
  if (!classList.includes("sus")) classList.push("sus");
}

function removeFlag(td) {
  const classList = td.attr("class").trim().split(" ");
  const susPos = classList.indexOf("sus");
  if (susPos > -1) classList.splice(susPos, 1);
}
