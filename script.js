'use strict';

const rollBtn = document.querySelector('.btn--roll');
const resetBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

//either use this or document.querySelector('#score--0');

//get elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

const player1 = document.querySelector('.player--1')
const player0 = document.querySelector('.player--0')


// we are implementing something called scoping here by using function variables outside of functions. 
//this will control how the points are added per player. 
let scores, currentScore, activePlayer, playing;


const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEL.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active')
}
init();

//starting conditions in accordance with flowchart
diceEL.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}


rollBtn.addEventListener('click', function () {
    if (playing) {
        //1. Generating random dice roll
        let randomNumberGen = Math.trunc(Math.random() * 6) + 1;

        //2. Display Dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${randomNumberGen}.png`;

        //3. Check if dice = 1, switch players if true 
        if (randomNumberGen !== 1) {
            // add to current score of this specific player
            currentScore += randomNumberGen;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer();
        }
    }
})

holdBtn.addEventListener('click', function () {
    if (playing) {
        //1. add current score to users score named score--0/1
        //clever way of distributing stats. using 
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

        //2. check if its >= to 100, if not swtich users and continue
        if (scores[activePlayer] >= 100) {
            diceEL.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
})

resetBtn.addEventListener('click', init)