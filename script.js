'use strict';
//Score Element
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //only for Id selector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Active = document.querySelector('.player--0');
const player1Active = document.querySelector('.player--1');

//Starting Conditions
let scores, currentScore, playerActive, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playerActive = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0Active.classList.remove('player--winner');
  player0Active.classList.add('player--active');
  player1Active.classList.remove('player--winner');
  player1Active.classList.remove('player--active');
  // document.getElementById(`name--${playerActive}`).textContent = `PLAYER 1`;
  diceEl.classList.add('hidden');
  playing = true;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${playerActive}`).textContent = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = 0;
  player0Active.classList.toggle('player--active');
  player1Active.classList.toggle('player--active');
};
//Rolling the Dice

btnRollDice.addEventListener('click', function () {
  if (playing) {
    // 1. Generating the random dice number
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for dice roll 1 and if the roll is 1 switch to player 2
    if (dice !== 1) {
      //Add dice score to the current score
      currentScore = currentScore + dice; // or currentScore += dice;
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      //Switch to other player
      switchPlayer();

      // if (playerActive !== 0) {
      //   player0Active.classList.remove('player--active');
      //   player1Active.classList.add('player--active');

      // } else {
      //   player0Active.classList.add('player--active');
      //   player1Active.classList.remove('player--active');

      // }
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add score of currentScore to Score of active player
    scores[playerActive] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${playerActive}`).textContent =
      scores[playerActive];

    // 2. check if score is >=100, then finish the game
    if (scores[playerActive] >= 120) {
      //Finish The Game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.remove('player--active');
      // document.getElementById(`name--${playerActive}`).textContent = `Winner🎉`;
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});
document.querySelector('.btn--new').addEventListener('click', init);
