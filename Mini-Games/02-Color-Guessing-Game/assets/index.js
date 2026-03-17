const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
const icons = document.querySelectorAll('.fa-heart');
const edit= document.querySelector('.edit');
const payBtn = document.querySelector('#payBtn');

function changeName(){
    var player = prompt("Enter Your name");
    p.textContent = `${player}`;
}
var player = prompt("Enter Your name");
const p = document.querySelector('.name');
p.textContent = `${player}`;
p.style.color = "orange";
p.style.fontSize = "xx-large";
p.style.textDecoration = "underline";

var currentStreak = 0;
var bestStreak = 0;
var pickCorrectColor = 0;
var color = [];
var num = 6;
var easyBestStreak = 0;
var lives = 3; 
function webLoad() {
    onLoad();
    setGame();
    displayContent();
}

function onLoad() {
    var temp2 = localStorage.getItem('easyBestStreak');
    easyBestStreak = temp2 ? parseInt(temp2) : 0;

    var temp = localStorage.getItem('highBestStreak');
    bestStreak = temp ? parseInt(temp) : 0;
}

function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    if (num == 6) {
        bestStreakDisplay.textContent = bestStreak;
    } else {
        bestStreakDisplay.textContent = easyBestStreak;
    }
}

function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    return `rgb${a}, ${b}, ${c}`;
}

function generateColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;
}

function pickGenerate() {
    const index = Math.floor(Math.random() * color.length);
    return color[index];
}

function setGame() {
    color = generateColors(num);
    pickCorrectColor = pickGenerate();
    colorDisplay.textContent = pickCorrectColor;
    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];
    }
}

function reset() {
    if (num == 3) {
        currentStreak = 0;
        easyBestStreak = 0;
        localStorage.removeItem('easyBestStreak');
    } else {
        currentStreak = 0;
        bestStreak = 0;
        localStorage.removeItem('highBestStreak');
    }
    messageDisplay.textContent = 'You reset your Best Streak';
    colorBoxes.forEach((box) => {
        box.style.pointerEvents = "auto";
    });
    displayContent();
    setGame();
}

function newRound() {
    colorDisplay.style.backgroundColor = 'white';
    setGame();
    messageDisplay.textContent = 'New Round Started!';
    displayContent();
    colorBoxes.forEach((box) => {
        box.style.pointerEvents = "auto";
    });

    // Reset hearts
    lives = 3;
    icons.forEach(icon => {
        icon.style.visibility = 'visible';
    });
}

webLoad();

function winGuess(event) {
    var tempBox = event.target;
    if (pickCorrectColor === tempBox.style.backgroundColor) {
        messageDisplay.textContent = 'You WON!';
        currentStreak++;
        displayContent();

        if (num == 6) {
            if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
                localStorage.setItem('highBestStreak', bestStreak);
            }
        } else {
            if (currentStreak > easyBestStreak) {
                easyBestStreak = currentStreak;
                localStorage.setItem('easyBestStreak', easyBestStreak);
            }
        }

        colorBoxes.forEach((box) => {
            box.style.backgroundColor = pickCorrectColor;
            box.style.pointerEvents = "none";
        });
        colorDisplay.style.backgroundColor = pickCorrectColor;

        // restore lives for next round
        lives = 3;
        icons.forEach(icon => icon.style.visibility = 'visible');

    } else {
        messageDisplay.textContent = 'Try Again!';
        currentStreak = 0;
        displayContent();
        tempBox.style.backgroundColor = '#808080';
        tempBox.style.pointerEvents = "none";

        if (lives > 0) {
            icons[lives - 1].style.visibility = 'hidden';
            lives--;
        }

        if (lives === 0) {
            messageDisplay.textContent = '💀 Game Over! You ran out of lives!';
            colorBoxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            // Auto restart removed. Player must click "New Round".
        }
    }
}

colorBoxes.forEach((box) => {
    box.addEventListener('click', winGuess);
});

function easyBn() {
    num = 3;
    currentStreak = 0;
    messageDisplay.textContent = 'You switched to Easy Mode';
    displayContent();
    setGame();
    easyBtn.style.backgroundColor = "white";
    easyBtn.style.color = "#343637";
    hardBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    hardBtn.style.color = "white";
    for (var i = 3; i < 6; i++) {
        colorBoxes[i].style.display = "none";
        colorBoxes[i].style.pointerEvents = "none";
    }
}

function hardBn() {
    num = 6;
    currentStreak = 0;
    messageDisplay.textContent = 'You switched to Hard Mode';
    displayContent();
    setGame();
    hardBtn.style.backgroundColor = "white";
    hardBtn.style.color = "#343637";
    easyBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    easyBtn.style.color = "white";
    for (var i = 3; i < 6; i++) {
        colorBoxes[i].style.display = "block";
        colorBoxes[i].style.pointerEvents = "auto";
    }
}
function payGame(){
var payment = prompt("Enter Payment Amount")

    if(payment>=2499){

        window.open('paynow.html');
    }
}

resetStreakBtn.addEventListener('click', reset);
newRoundBtn.addEventListener('click', newRound);
easyBtn.addEventListener('click', easyBn);
edit.addEventListener('click',changeName);
hardBtn.addEventListener('click', hardBn);
payBtn.addEventListener('click',payGame);