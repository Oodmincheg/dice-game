/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0];
let roundScore = 0;
let currentPlayer = 0;
let diceDOM = document.querySelector(".dice");
let gamePlaying;
let previousDice = 0;
let winnigScore;


const changePlayer = () => {
  previousDice = 0;
  roundScore = 0;
  document.querySelector("#current-" + currentPlayer).textContent = roundScore;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  diceDOM.style.display = "none";
};

const init = () => {
  winnigScore = document.getElementById('winning-score').value;
  gamePlaying = true;
  scores = [0, 0];
  dices = []
  roundScore = 0;
  previousDice = 0;
  currentPlayer = 0;
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
};
//document.querySelector('#current-' + currentPlayer).textContent = dice

document.querySelector(".dice").style.display = "none";
document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector(".btn-roll").addEventListener(
  "click",
  (handleClickRoll = () => {
    if (gamePlaying) {
      let dice = Math.floor(Math.random() * 6) + 1;
      dices.push(dice)
      if (dice === 6 && previousDice === 6) {
        scores[currentPlayer] = 0;
        document.getElementById("score-" + currentPlayer).textContent =
          scores[currentPlayer];
        changePlayer();
      } else {
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";
        if (dice !== 1) {
          previousDice = dice;
          roundScore += dice;
          document.querySelector(
            "#current-" + currentPlayer
          ).textContent = roundScore;
        } else {
          changePlayer();
        }
      }
    }
  })
);

document.querySelector(".btn-hold").addEventListener(
  "click",
  (handleClickHold = () => {
    if (gamePlaying) {
      scores[currentPlayer] += roundScore;
      document.getElementById("score-" + currentPlayer).textContent =
        scores[currentPlayer];
      if (scores[currentPlayer] >= winnigScore) {
        document.getElementById("name-" + currentPlayer).textContent = "Winner";
        diceDOM.style.display = "none";
        document
          .querySelector(".player-" + currentPlayer + "-panel")
          .classList.add("winner");
        document
          .querySelector(".player-" + currentPlayer + "-panel")
          .classList.remove("active");
        gamePlaying = false;
      } else changePlayer();
    }
  })
);
