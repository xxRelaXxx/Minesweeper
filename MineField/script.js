// HTML elements
const scoreCount = document.querySelector("#score");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".bad-end-game-screen");
const endGameScreenText = document.querySelector(".bad-end-game-screen-text");
const playAgainButton = document.querySelector(".play-again-button");

// Game variables
const cells = 100;
const bombs = 16;
const instantWinCell = 1;
const maxScore = cells - bombs - instantWinCell;
const bomblist = [];
const instantWinCellPosition = []
let score = 0;

// Functions

function generateBombs() {
  while (bomblist.length < bombs) {
    const number = Math.floor(Math.random() * cells) + 1;
    if (!bomblist.includes(number)) {
      bomblist.push(number);
    }
  }
}

// Generate instant win cell position

function generateInstantWinCellPosition() {
  const num = Math.floor(Math.random() * cells) + 1;

  if (!bomblist.includes(num) && !instantWinCellPosition.includes(num)) {
    instantWinCellPosition.push(num);
  }
}

// Score update function

function updateScore() {
  score++;
  scoreCount.innerText = String(score).padStart(4, '0');

  if (score === maxScore) {
    isVictory = true;
    checkGameOver();
  }
}

// Game over checking function

function checkGameOver() {
    if(isVictory) {
        endGameScreen.classList.remove("bad-end-game-screen");
        endGameScreen.classList.add("win")
        endGameScreenText.innerHTML = "勝利";
    }
    
    revealBombs();
    endGameScreen.classList.remove("hidden");
}

// Reveal bombs

function revealBombs() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    if (bomblist.includes(i + 1)) {
      cells[i].classList.add("cell-bomb");
    }
    if (instantWinCellPosition.includes(i + 1)) {
      cells[i].classList.add("cell-instant-win");
    }
  }
}

// Game initialization

function initializeGame() {
  
    generateBombs();
    instantWinCellPosition.length = 0;
    generateInstantWinCellPosition();

  for (let i = 0; i < cells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    grid.appendChild(cell);

    let isCellEven = false;
    let isRowEven = false;

    if (i % 2 === 0) {
      isCellEven = true;
    }

    if ((isCellEven && isRowEven) || (!isCellEven && !isRowEven)) {
      cell.classList.add("cell-dark");
    }

    cell.addEventListener("click", function (event) {
      if (event.target.classList.contains("cell-clicked")) {
        return;
      }

      const index = Array.from(grid.children).indexOf(cell);

      if (instantWinCellPosition.includes(index + 1)) {
        cell.classList.add("cell-instant-win");
        isVictory = true;
        checkGameOver();
      } else if (bomblist.includes(index + 1)) {
        cell.classList.add("cell-bomb");
        isVictory = false;
        checkGameOver();
      } else {
        cell.classList.add("cell-clicked");
        updateScore();
      }
    });
  }
}

// Play Again Button

playAgainButton.addEventListener("click", function () {
  location.reload();
});

//################################# STARTING THE GAME #################################

initializeGame();
