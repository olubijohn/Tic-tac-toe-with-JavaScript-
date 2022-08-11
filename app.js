const gameHead = document.querySelector(".head");
const gameBody = document.querySelector(".container");
const gameStart = document.querySelector(".start");
const gameOverArea = document.querySelector(".game-over");
const gameOverHead = document.querySelector(".game-over h4");
const tabs = document.querySelectorAll(".body button");
const display = document.querySelector(".head h1");
const gameOverBtns = document.querySelectorAll(".game-over button");

//Possible Numbers for wins
wins=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let gamePatternX = [];
let gamePatternO = [];
let player2Turn = false;
let winner = false;
clickCount = 0;

//Create Object Player
function Player (name) {
  this.name = name;
}
const player1 = new Player ("X");
const player2 = new Player ("O");
//Start game 
function startGame() {
  gamePatternX = [];
  gamePatternO = [];
  clickCount = 0;
}

//Check The winner
function checkWinner(arr){
    for (let x of wins){
        if (x.every(p=>arr.includes(p))){
            return true;
        }
    }
    return false;
}

//GameOver
function gameOver() {
  if (checkWinner(gamePatternX)) {
        gameOverArea.classList.remove("hide");
        gameBody.classList.add("hide");
        gameHead.classList.add("hide");
        gameOverHead.innerText = 'Player "X" Won';
  } else if (checkWinner(gamePatternO)) {
        gameOverArea.classList.remove("hide");
        gameBody.classList.add("hide");
        gameHead.classList.add("hide");
        gameOverHead.innerText = 'Player "O" Won';
  }else if (!checkWinner(gamePatternX) && !checkWinner(gamePatternO) && clickCount === 9) {
    gameOverArea.classList.remove("hide");
        gameBody.classList.add("hide");
        gameHead.classList.add("hide");
        gameOverHead.innerText = "It's A Draw";
  }
};

//Clicks for Every Button
tabs.forEach(tab => {
  tab.addEventListener("click", function() {
    tabClicked = true;
    if (tab.innerText != "X" && tab.innerText != "O") {
    if (!player2Turn) {
        player2Turn = true;
      tab.innerText = player1.name;
      display.innerText = `Player "${player2.name}" Turn`;
      gamePatternX.push(Number(tab.classList));
    } else {
      player2Turn = false;
      tab.innerText = player2.name;
      display.innerText = `Player "${player1.name}" Turn`;
      gamePatternO.push(Number(tab.classList));
    }
    clickCount++;
    gameOver();
    } else {
        alert("Click Another Button");
      }
  });
});

//GameOver Button
  gameOverBtns.forEach(gameOverBtn => {
    gameOverBtn.onclick = function() {
      if (gameOverBtn.innerText === "Yes") {
        reset();
      } else if (gameOverBtn.innerText === "No") {
        gameOverArea.classList.add("hide");
        gameBody.classList.remove("hide");
        gameHead.classList.remove("hide");
      }
    }
  });
  
  function reset() {
    gamePatternX = [];
        gamePatternO = [];
        tabs.forEach(tab => {
          tab.innerText = "";
        });
        gameOverArea.classList.add("hide");
        gameBody.classList.remove("hide");
        gameHead.classList.remove("hide");
        clickCount = 0;
  }
