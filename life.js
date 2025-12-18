let rows = 15;
let cols = 15;
let playing = false;

let grid =new Array(rows);
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
        // throw error
        console.error("Problem: no div for the grid table!");
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
    let row = (rowcol[0]);
    let col =(rowcol[1]);


    let classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    }
    else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
    }
}

function setupControlButtons() {
    let startButton = document.querySelector("#start");
    let clearButton = document.querySelector("#clear");

    startButton.onclick = () => {
        if (playing) {
            console.log("Pause game");
            playing = false;
            startButton.innerHTML = "Continue";

        }

        else {
            console.log('cont the game');
            playing = true;
            startButton.innerHTML = "Pause";
            play();
        }
    }
    clearButton.onclick = () => {
        playing = false;
        startButton.innerHTML = "start";
    }
}
function play() {
    console.log("Playing the game");
    computenextGen();
}

function computeNextGen() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      applyRules(i, j);
    }
  }
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
  console.log("bunka row " + row + " col " + col + "ma sousedu:" + count);
  return count;
}