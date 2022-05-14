'use strict';
let score,
  roundScore,
  firstDiceValue,
  secondDiceValue,
  activePlayer,
  diceOneBody,
  diceTwoBody,
  gamePlaying,
  previousScore = [],
  maxValue;

document.querySelector('#winning--score--btn').addEventListener('click', () =>
{
  let inputBox = document.querySelector('#winning--score').value;
  if (inputBox) {
    maxValue = Number(inputBox.value)
    inputBox = '';
  }
  document.querySelector('.pop-up').classList.add(`hidden`);
  document.querySelector(
    '.pop-up--message'
  ).innerHTML = `YOUR HIGH SCORE IS: `+ maxValue;
  
})

document.querySelector('.pop-up').addEventListener('click', () => {
  document.querySelector('.pop-up').classList.remove(`hidden`);
});

//gamePlaying is the state updating variable.
initializeGame();

function rollDiceAction(e) {
  e.preventDefault();

  if (gamePlaying) {
    firstDiceValue = Math.floor(Math.random() * 6) + 1;
    secondDiceValue = Math.floor(Math.random() * 6) + 1;
    document.querySelector(`#current--` + activePlayer).innerHTML = firstDiceValue;

    diceOneBody.style.display = `block`;
    diceOneBody.setAttribute('src', `dice-${firstDiceValue}.png`);
    diceTwoBody.style.display = `block`;
    diceTwoBody.setAttribute(`src`, `dice-` + secondDiceValue + `.png`);


    if (firstDiceValue !== 1 && secondDiceValue !== 1) {
      roundScore += firstDiceValue + secondDiceValue;
      document.querySelector(`#current--` + activePlayer).innerHTML = roundScore;

      //previousScore
      previousScore.push(firstDiceValue);
      for (let i = 0; i < previousScore.length; i++) {
        if (previousScore[i] === previousScore[i + 1] && previousScore[i]===6) {
          previousScore = [];
          roundScore = 0;
          score[activePlayer] = 0;
          document.querySelector(`#score--` + activePlayer).innerHTML = score[activePlayer];
          nextPlayer();
        }
      }

    } else {

      nextPlayer();

    }
  }
}

let holdBtn = document.querySelector(`.btn--hold`).addEventListener(`click`, function (e) {
  e.preventDefault();
  //add current score to player global score
  if (gamePlaying) {
    score[activePlayer] = score[activePlayer] + roundScore;
    document.querySelector(`#score--` + activePlayer).innerHTML = score[activePlayer];

    if (score[activePlayer] >= maxValue) {
      //DECLARE WINNER
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document.querySelector( `#name--` + activePlayer ).innerHTML = `WINNER!!!`;
      document.querySelector(`#name--` + activePlayer).classList.add(`name`);
      document.querySelector('#current--1').textContent = '0';
      document.querySelector('#current--0').textContent = '0';
      gamePlaying = false;
      // rolldice.removeEventListener('click', rollDiceAction);
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener(`click`, initializeGame);

function nextPlayer() {

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  previousScore = [];
  document.querySelector('#current--1').textContent = '0';
  document.querySelector('#current--0').textContent = '0';
  //toogle classList check if the classlist was there and removes it if available, but does vise versa if unavailable
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  //hiding the dice once more
  //  diceOneBody.style.display = `none`;
}

function initializeGame() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  maxValue = 100;


  document.querySelector('#current--1').textContent = '0';
  document.querySelector('#current--0').textContent = '0';
  document.querySelector(`#score--0`).innerHTML = `0`;
  document.querySelector(`#score--1`).innerHTML = `0`;

  document.querySelector(`#name--0`).innerHTML = `PLAYER 1`;
  document.querySelector(`#name--1`).innerHTML = `PLAYER 2`;
  document
    .querySelectorAll(`.player`)
    .forEach(eachitem => eachitem.classList.remove(`player--active`));
  document
    .querySelectorAll(`.player`)
    .forEach(eachitem => eachitem.classList.remove(`player--winner`));
  document
    .querySelector('.player--' + activePlayer)
    .classList.add(`player--active`);

  diceOneBody = document.querySelector(`.dice1`);
  diceTwoBody = document.querySelector(`.dice2`);
  diceOneBody.style.display = `none`;
  diceTwoBody.style.display = `none`;
  let rolldice = document.querySelector('.btn--roll');
  rolldice.addEventListener('click', rollDiceAction);
}