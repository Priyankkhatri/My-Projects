var player = prompt("Enter Your name");
const p = document.querySelector('.name');

// DOM Elements
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

// Required variables
let score = 0;
let time = 30;
let bestScore = 0;
let playGame = false;
let gameId = null;
let pause = false;

// Common functions
function webLoad() {
  onLoad();
  displayContent();
}

function onLoad() {
  const temp = localStorage.getItem('highScoreMole');
  bestScore = temp ? parseInt(temp) : 0;
}

function displayContent() {
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = time;
  maxScoreDisplay.textContent = bestScore;
}

function endGame() {
  clearInterval(gameId);
  playGame = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;

  const bgVideo = document.querySelector('#bg-video');

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('highScoreMole', bestScore);
    alert(`🎉 New High Score! You scored: ${score}`);

    bgVideo.classList.add('show');

    setTimeout(() => {
      bgVideo.classList.remove('show');
    }, 10000);
  } else {
    alert(`Your current score: ${score}`);
  }

  displayContent();
}

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomHole() {
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function popGame() {
  if (!playGame || pause) return; 

  const timer = randomTime(500, 1500);
  const hole = randomHole();
  const mole = hole.querySelector('.mole');

  mole.classList.add('up');

  setTimeout(() => {
    mole.classList.remove('up');
    if (playGame && !pause) popGame();
  }, timer);
}

function startGame() {
  time = 30;
  score = 0;
  playGame = true;
  pause = false;
  startBtn.disabled = true;
  resetBtn.disabled = true;
  pauseBtn.disabled = false;
  pauseBtn.textContent = "Pause Game";

  displayContent();
  popGame();

  gameId = setInterval(() => {
    if (!pause) {
      time--;
      displayContent();

      if (time <= 0) {
        endGame();
      }
    }
  }, 1000);
}

function resetGame() {
  score = 0;
  bestScore = 0;
  localStorage.removeItem('highScoreMole');
  time = 30;
  displayContent();
  alert("Game has been reset!");
}

function bonk(event) {
  if (!event.isTrusted) return;

  if (event.target.classList.contains('up')) {
    event.target.classList.remove('up');
    event.target.classList.add('bonked');
    score++;
    displayContent();

    setTimeout(() => {
      event.target.classList.remove('bonked');
    }, 300);
  }
}

// pause/resume function
function pauseGame() {
  if (!playGame) return; 

  if (!pause) {
    pause = true;
    scoreDisplay.disabled=true;
    pauseBtn.textContent = "Resume Game";
  } else {
    pause = false;
    scoreDisplay.disabled=false;
    pauseBtn.textContent = "Pause Game";
    popGame();
  }
}

webLoad();
moles.forEach((box) => box.addEventListener('click', bonk));

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
pauseBtn.addEventListener('click', pauseGame);
