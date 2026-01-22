// ==============================================
// NASTAVENÍ HRY
// ==============================================
let rows = 20;  // Počet řádků mřížky
let cols = 20;  // Počet sloupců mřížky
let playing = false;  // Je hra spuštěná? (true/false)
let reproductionTime = 300;  // Rychlost hry v milisekundách
let timer;  // Časovač pro automatické přehrávání

let grid = new Array(rows);  // Aktuální stav hry (0 = mrtvá, 1 = živá)
let nextgrid = new Array(rows);  // Příští generace (vypočítává se dopředu)

// ==============================================
// SPUŠTĚNÍ PŘI NAČTENÍ STRÁNKY
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
  createTable();  // Vytvoří HTML tabulku s buňkami
  initializeGrids();  // Vytvoří 2D pole pro grid a nextgrid
  resetGrids();  // Nastaví všechny buňky na mrtvé (0)
  setupControlButtons();  // Připojí funkce k tlačítkům
});

// ==============================================
// INICIALIZACE POLÍ
// ==============================================
function initializeGrids() {
    // Vytvoří 2D pole (pole polí) pro grid i nextgrid
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextgrid[i] = new Array(cols);
    }
}

function resetGrids() {
    // Nastaví všechny buňky na 0 (mrtvé)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextgrid[i][j] = 0;
        }
    }
}

// ==============================================
// VYTVOŘENÍ HTML TABULKY
// ==============================================
function createTable() {
    // Najde div s id="gridContainer" v HTML
    let gridContainer = document.getElementById("gridContainer");
    if (!gridContainer) {
        console.error("Problem: no div for the grid table!");
    }
    
    // Vytvoří novou HTML tabulku
    let table = document.createElement("table");

    // Projde všechny řádky a sloupce
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");  // Nový řádek <tr>
        
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");  // Nová buňka <td>
            cell.setAttribute("id", i + "_" + j);  // ID jako "5_10" (řádek_sloupec)
            cell.setAttribute("class", "dead");  // CSS třída pro mrtvou buňku
            cell.onclick = cellClickHandler;  // Co se stane při kliknutí
            tr.appendChild(cell);  // Přidá buňku do řádku
        }
        table.appendChild(tr);  // Přidá řádek do tabulky
    }
    gridContainer.appendChild(table);  // Přidá tabulku do stránky
}

// ==============================================
// KLIKÁNÍ NA BUŇKY
// ==============================================
function cellClickHandler() {
    // Rozdělí ID "5_10" na ["5", "10"]
    let rowcol = this.id.split("_");
    let row = (rowcol[0]);  // Řádek
    let col = (rowcol[1]);  // Sloupec

    // Zjistí, jestli je buňka živá nebo mrtvá
    let classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        // Živá → Zabij ji
        this.setAttribute("class", "dead");  // Změní CSS na mrtvou
        grid[row][col] = 0;  // Nastaví hodnotu v poli na 0
    }
    else {
        // Mrtvá → Oživ ji
        this.setAttribute("class", "live");  // Změní CSS na živou
        grid[row][col] = 1;  // Nastaví hodnotu v poli na 1
    }
}

// ==============================================
// NASTAVENÍ TLAČÍTEK
// ==============================================
function setupControlButtons() {
    // Najde tlačítka v HTML
    let startButton = document.querySelector("#start");
    let clearButton = document.querySelector("#clear");
    let randomButton = document.querySelector("#random");

    // START/STOP TLAČÍTKO
    startButton.onclick = () => {
        if (playing) {
            // Pokud hra běží → Zastav ji
            playing = false;
            startButton.innerHTML = "start";
            clearTimeout(timer);  // Zastaví časovač
        } else {
            // Pokud hra neběží → Spusť ji
            playing = true;
            startButton.innerHTML = "stop";
            play();  // Spustí herní smyčku
        }
    }
    
    // CLEAR TLAČÍTKO - vymaže vše
    clearButton.onclick = () => {
        playing = false;
        startButton.innerHTML = "start";
        clearTimeout(timer);  // Zastaví časovač
        resetGrids();  // Nastaví všechny buňky na mrtvé
        updateView();  // Překreslí obrazovku
    }
    
    // RANDOM TLAČÍTKO - náhodně naplní mřížku
    randomButton.onclick = () => {
        playing = false;
        startButton.innerHTML = "start";
        clearTimeout(timer);  // Zastaví časovač
        randomizeGrid();  // Náhodně vytvoří vzor
    }
}

// ==============================================
// HLAVNÍ HERNÍ SMYČKA
// ==============================================
function play() {
    computeNextGen();  // Vypočítá příští generaci podle pravidel
    updateGrid();  // Přepne grid na nextgrid a překreslí
    
    // Pokud hra běží, znovu zavolej play() za 300ms
    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

// ==============================================
// VÝPOČET PŘÍŠTÍ GENERACE
// ==============================================
function computeNextGen() {
  // Projde každou buňku v mřížce
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      applyRules(i, j);  // Aplikuje Conway's pravidla na tuto buňku
    }
  }
}

// ==============================================
// CONWAY'S PRAVIDLA GAME OF LIFE
// ==============================================
function applyRules(row, col) {
  let numNeighbors = countNeighbors(row, col);  // Spočítá živé sousedy (0-8)
  
  if (grid[row][col] == 1) {
    // ŽIVÁ BUŇKA:
    if (numNeighbors < 2 || numNeighbors > 3) {
      nextgrid[row][col] = 0;  // Umře (samota nebo přelidnění) ☠️
    } else {
      nextgrid[row][col] = 1;  // Přežije (2 nebo 3 sousedé) ✅
    }
  } else {
    // MRTVÁ BUŇKA:
    if (numNeighbors == 3) {
      nextgrid[row][col] = 1;  // Narodí se (přesně 3 sousedé) 🐣
    } else {
      nextgrid[row][col] = 0;  // Zůstane mrtvá
    }
  }
}
// ==============================================
// POČÍTÁNÍ ŽIVÝCH SOUSEDŮ
// ==============================================
function countNeighbors(row, col) {
  let count = 0;
  
  // Projde všechny 8 okolních buněk:
  //  [ ][ ][ ]
  //  [ ][X][ ]  <- X je naše buňka
  //  [ ][ ][ ]
  
  for (let i = -1; i <= 1; i++) {      // -1, 0, 1 (nahoru, střed, dolů)
    for (let j = -1; j <= 1; j++) {    // -1, 0, 1 (vlevo, střed, vpravo)
      if (i === 0 && j === 0) continue;  // Přeskoč sebe (střed)
      
      let newRow = row + i;  // Spočítá souřadnice souseda
      let newCol = col + j;
      
      // Zkontroluj, že soused je uvnitř mřížky (nepadneme ven)
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        count += grid[newRow][newCol];  // Přičti 1 pokud je soused živý
      }
    }
  }
  
  return count;  // Vrátí počet živých sousedů (0-8)
}

// ==============================================
// AKTUALIZACE STAVU HRY
// ==============================================
function updateGrid() {
  // Přepne nextgrid → grid (nová generace se stane aktuální)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = nextgrid[i][j];  // Zkopíruje hodnoty
      nextgrid[i][j] = 0;  // Vyčistí nextgrid pro příští generaci
    }
  }
  updateView();  // Překreslí obrazovku
}

// ==============================================
// PŘEKRESLENÍ OBRAZOVKY
// ==============================================
function updateView() {
  // Projde všechny buňky a aktualizuje jejich vzhled
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.getElementById(i + "_" + j);  // Najde HTML element
      if (grid[i][j] == 1) {
        cell.setAttribute("class", "live");  // Živá → bílá barva
      } else {
        cell.setAttribute("class", "dead");  // Mrtvá → průhledná
      }
    }
  }
}

// ==============================================
// NÁHODNÉ NAPLNĚNÍ MŘÍŽKY
// ==============================================
function randomizeGrid() {
  resetGrids();  // Nejdřív vyčisti vše
  
  // Projde všechny buňky a náhodně je oživ
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Math.random() vrací náhodné číslo 0.0 - 1.0
      // Pokud je > 0.7 (30% šance), buňka bude živá
      grid[i][j] = Math.random() > 0.7 ? 1 : 0;
    }
  }
  updateView();  // Překreslí obrazovku
  } 