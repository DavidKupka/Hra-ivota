let rows = 15;
let cols = 15;
let playing = false;

let timer;
let reproductionTime = 100;
let rows = 15;
let cols = 15;
let playing = false;
let timer = null;
let generationSpeed = 300; // ms between generations

let grid = new Array(rows);
let nextgrid = new Array(rows);

document.addEventListener('DOMContentLoaded', () => {
  createTable();
  initializeGrids();
  resetGrids();
  setupControlButtons();
});

function initializeGrids() {
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    nextgrid[i] = new Array(cols);
  }
}

function resetGrids() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
      nextgrid[i][j] = 0;
    }
  }
}

function createTable() {
  let gridContainer = document.getElementById("gridContainer");
  if (!gridContainer) {
    console.error("Problem: no div for the grid table!");
    return;
  }
  let table = document.createElement("table");

  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", i + "_" + j);
      cell.setAttribute("class", "dead");
      cell.onclick = cellClickHandler;
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

function cellClickHandler() {
  let rowcol = this.id.split("_");
  let row = parseInt(rowcol[0], 10);
  let col = parseInt(rowcol[1], 10);

  let classes = this.getAttribute("class");
  if (classes && classes.indexOf("live") > -1) {
    this.setAttribute("class", "dead");
    grid[row][col] = 0;
  } else {
    this.setAttribute("class", "live");
    grid[row][col] = 1;
  }
}

function setupControlButtons() {
  let startButton = document.querySelector("#start");
  let clearButton = document.querySelector("#clear");
  let randomButton = document.querySelector("#random");

  startButton.onclick = () => {
    if (playing) {
      playing = false;
      startButton.innerHTML = "Continue";
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    } else {
      playing = true;
      startButton.innerHTML = "Pause";
      play();
    }
  }

  clearButton.onclick = () => {
    playing = false;
    startButton.innerHTML = "start";
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    resetGrids();
    updateView();
  }

  randomButton.onclick = () => {
    randomizeGrid(0.35); // 35% filled by default
  }
}

function play() {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    computeNextGen();
    updateView();
  }, generationSpeed);
}

function computeNextGen() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      applyRules(i, j);
    }
  }
  copyNextGridToGrid();
}

function copyNextGridToGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = nextgrid[i][j];
      nextgrid[i][j] = 0;
    }
  }
}

function updateView() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.getElementById(i + "_" + j);
      if (!cell) continue;
      if (grid[i][j] == 1) {
        cell.setAttribute("class", "live");
      } else {
        cell.setAttribute("class", "dead");
      }
    }
  }
}

function randomizeGrid(prob = 0.3) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.random() < prob ? 1 : 0;
    }
  }
  updateView();
}

function applyRules(row, col) {
  let numNeighbors = countNeighbors(row, col);
  if (grid[row][col] == 1) {
    if (numNeighbors < 2) {
      nextgrid[row][col] = 0;
    } else if (numNeighbors == 2 || numNeighbors == 3) {
      nextgrid[row][col] = 1;
    } else if (numNeighbors > 3) {
      nextgrid[row][col] = 0;
    }
  } else if (grid[row][col] == 0) {
    if (numNeighbors == 3) {
      nextgrid[row][col] = 1;
    } else {
      nextgrid[row][col] = 0;
    }
  }
}

function countNeighbors(row, col) {
  let count = 0;
  if (row - 1 >= 0) {
    if (grid[row - 1][col] == 1) count++;
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (grid[row - 1][col - 1] == 1) count++;
  }
  if (row - 1 >= 0 && col + 1 < cols) {
    if (grid[row - 1][col + 1] == 1) count++;
  }
  if (col - 1 >= 0) {
    if (grid[row][col - 1] == 1) count++;
  }
  if (col + 1 < cols) {
    if (grid[row][col + 1] == 1) count++;
  }
  if (row + 1 < rows) {
    if (grid[row + 1][col] == 1) count++;
  }
  if (row + 1 < rows && col - 1 >= 0) {
    if (grid[row + 1][col - 1] == 1) count++;
  }
  if (row + 1 < rows && col + 1 < cols) {
    if (grid[row + 1][col + 1] == 1) count++;
  }
  console.log("bunka row " + row + " col " + col + " ma sousedu: " + count);
  return count;
}
    sousedipocetpotrebalabelzrozeni.setAttribute("for", "sousedipocetpotreba");
    sousedipocetpotrebalabelzrozeni.innerHTML = " Počet sousedů pro zrození: ";
    sousedipocetpotrebalabelzrozeni.style.color = "white";
    sousedipocetpotrebalabelzrozeni.style.fontSize = "1.2rem";
    sousedipocetpotrebalabelzrozeni.style.fontFamily = "Arial, sans-serif";
    sousedipocetpotrebalabelzrozeni.style.margin = "0 10px 0 20px";

    
    let sousedipocetpotrebazrozeni = controlsdiv.appendChild(document.createElement("input"));
    sousedipocetpotrebazrozeni.setAttribute("type", "number");
    sousedipocetpotrebazrozeni.setAttribute("value", minpocetsouseduprozrozeni);
    sousedipocetpotrebazrozeni.setAttribute("id", "sousedipocetpotrebazrozeni");
    sousedipocetpotrebazrozeni.setAttribute("class", "inputfield");
    sousedipocetpotrebazrozeni.style.marginTop = "10px";
    sousedipocetpotrebazrozeni.style.width = "60px";
    sousedipocetpotrebazrozeni.addEventListener("input", () => {
        if (sousedipocetpotrebazrozeni.value < 3){
            sousedipocetpotrebazrozeni.value = 3;
            minpocetsouseduprozrozeni = parseInt(sousedipocetpotrebazrozeni.value);
        }
        else{
        minpocetsouseduprozrozeni = parseInt(sousedipocetpotrebazrozeni.value);
        }
    });

    let maxsousedipocetpotrebalabelprozaniknuti = controlsdiv.appendChild(document.createElement("label"));
    maxsousedipocetpotrebalabelprozaniknuti.setAttribute("for", "sousedipocetpotreba");
    maxsousedipocetpotrebalabelprozaniknuti.innerHTML = "Maximální počet sousedů pro zánik: ";
    maxsousedipocetpotrebalabelprozaniknuti.style.color = "white";
    maxsousedipocetpotrebalabelprozaniknuti.style.fontSize = "1.2rem";
    maxsousedipocetpotrebalabelprozaniknuti.style.fontFamily = "Arial, sans-serif";
    maxsousedipocetpotrebalabelprozaniknuti.style.margin = "0 10px 0 20px";

    let maxsousedipocetpotrebaprozaniknuti = controlsdiv.appendChild(document.createElement("input"));
    maxsousedipocetpotrebaprozaniknuti.setAttribute("type", "number");
    maxsousedipocetpotrebaprozaniknuti.setAttribute("value", maxpocetsouseduprozaniknuti);
    maxsousedipocetpotrebaprozaniknuti.setAttribute("id", "sousedipocetpotrebaprozaniknuti");
    maxsousedipocetpotrebaprozaniknuti.setAttribute("class", "inputfield");
    maxsousedipocetpotrebaprozaniknuti.style.marginTop = "10px";
    maxsousedipocetpotrebaprozaniknuti.style.width = "60px";

    maxsousedipocetpotrebaprozaniknuti.addEventListener("input", () => {
        if (maxsousedipocetpotrebaprozaniknuti.value < 3){
            maxsousedipocetpotrebaprozaniknuti.value = 3;
           maxpocetsouseduprozaniknuti = parseInt(maxsousedipocetpotrebaprozaniknuti.value);
        }
        else{
        maxpocetsouseduprozaniknuti = parseInt(maxsousedipocetpotrebaprozaniknuti.value);
        }
    });
    
    let minsousedipocetpotrebalabelprozaniknuti = controlsdiv.appendChild(document.createElement("label"));
    minsousedipocetpotrebalabelprozaniknuti.setAttribute("for", "sousedipocetpotreba");
    minsousedipocetpotrebalabelprozaniknuti.innerHTML = " Minimální počet sousedů pro zánik: ";
    minsousedipocetpotrebalabelprozaniknuti.style.color = "white";
    minsousedipocetpotrebalabelprozaniknuti.style.fontSize = "1.2rem";
    minsousedipocetpotrebalabelprozaniknuti.style.fontFamily = "Arial, sans-serif";
    minsousedipocetpotrebalabelprozaniknuti.style.margin = "0 10px 0 20px"; 

    let minsousedipocetpotrebaprozaniknuti = controlsdiv.appendChild(document.createElement("input"));
    minsousedipocetpotrebaprozaniknuti.setAttribute("type", "number");
    minsousedipocetpotrebaprozaniknuti.setAttribute("value", minpocetsouseduprozaniknuti);
    minsousedipocetpotrebaprozaniknuti.setAttribute("id", "sousedipocetpotrebaprozaniknuti");
    minsousedipocetpotrebaprozaniknuti.setAttribute("class", "inputfield");
    minsousedipocetpotrebaprozaniknuti.style.marginTop = "10px";
    minsousedipocetpotrebaprozaniknuti.style.width = "60px";

    minsousedipocetpotrebaprozaniknuti.addEventListener("input", () => {
        if (minsousedipocetpotrebaprozaniknuti.value < 2){
            minsousedipocetpotrebaprozaniknuti.value = 2;
           minpocetsouseduprozaniknuti = parseInt(minsousedipocetpotrebaprozaniknuti.value);
        }
        else{
        minpocetsouseduprozaniknuti = parseInt(minsousedipocetpotrebaprozaniknuti.value);
        }
    });
    
    let minpocetproprelabel = controlsdiv.appendChild(document.createElement("label"));
    minpocetproprelabel.setAttribute("for", "minpocetpropre");
    minpocetproprelabel.innerHTML = " Minimální počet sousedů pro přežití: ";
    minpocetproprelabel.style.color = "white";
    minpocetproprelabel.style.fontSize = "1.2rem";
    minpocetproprelabel.style.fontFamily = "Arial, sans-serif";
    minpocetproprelabel.style.margin = "0 10px 0 20px";

    let minpocetpropre = controlsdiv.appendChild(document.createElement("input"));;
    minpocetpropre.setAttribute("type", "number");
    minpocetpropre.setAttribute("value", minpocpropre);
    minpocetpropre.setAttribute("id", "minpocetpropre");
    minpocetpropre.setAttribute("class", "inputfield");
    minpocetpropre.style.marginTop = "10px";
    minpocetpropre.style.width = "60px";
    minpocetpropre.addEventListener("input", () => {
        if (minpocetpropre.value < 2){
            minpocetpropre.value = 2;
            minpocpropre = parseInt(minpocetpropre.value);
        }
        else{
        minpocpropre = parseInt(minpocetpropre.value);
        }
    });

    let maxpocetproprelabel = controlsdiv.appendChild(document.createElement("label"));
    maxpocetproprelabel.setAttribute("for", "maxpocetpropre");
    maxpocetproprelabel.innerHTML = " Maximální počet sousedů pro přežití: ";
    maxpocetproprelabel.style.color = "white";
    maxpocetproprelabel.style.fontSize = "1.2rem";
    maxpocetproprelabel.style.fontFamily = "Arial, sans-serif";
    maxpocetproprelabel.style.margin = "0 10px 0 20px";

    let maxpocetpropre = controlsdiv.appendChild(document.createElement("input"));;
    maxpocetpropre.setAttribute("type", "number");
    maxpocetpropre.setAttribute("value", maxpocpropre);
    maxpocetpropre.setAttribute("id", "maxpocetpropre");
    maxpocetpropre.setAttribute("class", "inputfield");
    maxpocetpropre.style.marginTop = "10px";
    maxpocetpropre.style.width = "60px";
    maxpocetpropre.addEventListener("input", () => {
        if (maxpocetpropre.value < 3){
            maxpocetpropre.value = 3;
            maxpocpropre = parseInt(maxpocetpropre.value);
        }
        else{
        maxpocpropre = parseInt(maxpocetpropre.value);
        }
    }); 
    let inputfields = document.querySelectorAll(".inputfield");
    inputfields.forEach(field => {
        field.style.backgroundColor = "grey";
        field.style.color = "white";
        field.style.border = "1px solid white";
        field.style.borderRadius = "5px";
        field.style.padding = "5px";
        field.style.fontSize = "1rem";
    });
  
}

function setupControlButtons() {

    let startButton = document.querySelector('#start');
    let clearButton = document.querySelector('#clear');
    let rButton = document.querySelector('#random');

    startButton.onclick = () => {
        if (playing) {
            console.log('Pause the Game');
            playing = false;
            startButton.innerHTML = 'continue';
        } else {
            console.log('Cont the game');
            playing = true;
            startButton.innerHTML = 'pause';
            play();
        };
    };

    clearButton.onclick = () => {
        console.log("kliknul si na clear");
        playing = false;
        startButton.innerHTML = "start";
        resetGrids();
        updateView();
       updateLiveCellCount();
    };

     rButton.onclick = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = Math.floor(Math.random() * 2);
                var cell = document.getElementById(i + '_' + j);
                if (grid[i][j] == 1) cell.setAttribute('class', 'live');
                else cell.setAttribute('class', 'dead');
            }
        }
        updateLiveCellCount();
    }
}
function play() {
    console.log("Hra jede.");
    computeNextGen();
    updateLiveCellCount();
     if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      applyRules(i, j);
    }
  }
  copyAndResetGrid();
    updateView();
}

function updateLiveCellCount() {
    let liveCellCount = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] == 1) {
                liveCellCount++;
            }
        }
    }
    let textgrid = document.querySelector("#textgrid h1");
    textgrid.innerHTML = "Živé buňky: " + liveCellCount;
}

function copyAndResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(i + '_' + j);
            if (grid[i][j] == 0) {
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'live');
            }
        }
    }
}

function applyRules(row, col) {
  let numNeighbors = countNeighbors(row, col);
  if (grid[row][col] == 1) {
    if (numNeighbors < minpocetsouseduprozaniknuti) {
      nextGrid[row][col] = 0;
    } else if (numNeighbors == minpocpropre || numNeighbors == maxpocpropre) {
      nextGrid[row][col] = 1;
    } else if (numNeighbors > maxpocetsouseduprozaniknuti) {
      nextGrid[row][col] = 0;
    }
  } else if (grid[row][col] == 0) {
    if (numNeighbors == minpocetsouseduprozrozeni) {
      nextGrid[row][col] = 1;
    }
  }
}

function countNeighbors(row, col) {
  let count = 0;
  if (row - 1 >= 0) {
    if (grid[row - 1][col] == 1) count++;
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (grid[row - 1][col - 1] == 1) count++;
  }
  if (row - 1 >= 0 && col + 1 < cols) {
    if (grid[row - 1][col + 1] == 1) count++;
  }
  if (col - 1 >= 0) {
    if (grid[row][col - 1] == 1) count++;
  }
  if (col + 1 < cols) {
    if (grid[row][col + 1] == 1) count++;
  }
  if (row + 1 < rows) {
    if (grid[row + 1][col] == 1) count++;
  }
  if (row + 1 < rows && col - 1 >= 0) {
    if (grid[row + 1][col - 1] == 1) count++;
  }
  if (row + 1 < rows && col + 1 < cols) {
    if (grid[row + 1][col + 1] == 1) count++;
  }
  return count;
}

function cellClickHandler() {
    let rowcol = this.id.split("_");
    let row = rowcol[0];
    let col = rowcol[1];


  let classes = this.getAttribute('class');
  if (classes.indexOf('live') > -1) {
    this.setAttribute('class', 'dead');
    grid[row][col] = 0;
    updateLiveCellCount();
  } else {
    this.setAttribute('class', 'live');
    grid[row][col] = 1;
    updateLiveCellCount();
  }
}