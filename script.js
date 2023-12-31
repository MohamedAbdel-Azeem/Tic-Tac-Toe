import { game } from "./gameScript.js";
const jsConfetti = new JSConfetti()
////////////////// This is Script is mainly for the UI and Dom Manipulation //////////////////////


// Select the button and input elements
const player1Button = document.getElementById('player-1-ready');
const player1Input = player1Button.previousElementSibling;

const player2Button = document.getElementById('player-2-ready');
const player2Input = player2Button.previousElementSibling;

let player1Name = 'Player 1';
let player2Name = 'Player 2';
let imgSrc = './assets/check.svg';
let player1Ready = false;
let player2Ready = false;
// Add event listeners to the buttons
player1Button.addEventListener('click', function() {
    const player1Tag = document.createElement('p');
    player1Tag.classList.add('text-center', 'text-2xl', 'text-slate-200');
    if (player1Input.value !== '') {
        player1Name = player1Input.value;
        player1Tag.textContent = player1Name;
    } else {
        player1Tag.textContent = 'Player 1';
    }
    player1Input.parentElement.replaceChild(player1Tag, player1Input);
    const img1 =  document.createElement('img');
    img1.id = 'player-1-ready';
    img1.src = imgSrc;
    img1.classList.add('w-full', 'max-md:h-12' , 'h-auto');
    player1Button.parentNode.replaceChild(img1, player1Button);
    player1Ready = true;
    ifReady();
});

player2Button.addEventListener('click', function() {
    const player2Tag = document.createElement('p');
    player2Tag.classList.add('text-center', 'text-2xl', 'text-slate-200');
    if (player2Input.value !== '') {
        player2Name = player2Input.value;
        player2Tag.textContent = player2Name;
    } else {
        player2Tag.textContent = 'Player 2';
    }
    player2Input.parentElement.replaceChild(player2Tag, player2Input);
    const img2 =  document.createElement('img');
    img2.id = 'player-2-ready';
    img2.src = imgSrc;
    img2.classList.add('w-full', 'max-md:h-12', 'h-auto');
    player2Button.parentNode.replaceChild(img2, player2Button);
    player2Ready = true;
    ifReady();
});

function ifReady() {
    if (player1Ready && player2Ready) {
        
        //removing the hint
        const hint = document.getElementById('hint');
        hint.parentNode.removeChild(hint);
        // remove img 1 and img 2
        const img1 = document.getElementById('player-1-ready');
        const img2 = document.getElementById('player-2-ready');
    
        img1.parentNode.removeChild(img1);
        img2.parentNode.removeChild(img2);
    
        const player1Card = document.getElementById('player-1-card');
        const player2Card = document.getElementById('player-2-card');
    
        player1Card.classList.add('translate-x-[-120%]', 'max-md:scale-50','max-md:translate-x-[-35%]','max-md:translate-y-[160%]');
        player2Card.classList.add('translate-x-[120%]','max-md:scale-50','max-md:translate-x-[35%]','max-md:translate-y-[22%]');
        
        /////////////////////////// Game Starts Here ///////////////////////////
        const theGame = game;
        theGame.playGame();

        const player1Score = document.createElement('p');
        player1Score.id = 'player-1-score';
        player1Score.classList.add('text-center', 'text-2xl', 'text-slate-200');
        let player1ScoreText = 'Score: 0';
        player1Score.textContent = player1ScoreText;
        player1Card.appendChild(player1Score);

        const player2Score = document.createElement('p');
        player2Score.id = 'player-2-score';
        player2Score.classList.add('text-center', 'text-2xl', 'text-slate-200');
        let player2ScoreText = 'Score: 0';
        player2Score.textContent = player2ScoreText;
        player2Card.appendChild(player2Score);

        const tiesPtag = document.createElement('p');
        tiesPtag.id = 'ties';
        tiesPtag.classList.add('text-center', 'text-2xl', 'text-slate-200' , 'max-md:translate-y-[-50%]');
        let tiesText = 'Ties: 0';
        tiesPtag.textContent = tiesText;
        document.querySelector('#bottom-part').appendChild(tiesPtag);

        //// Reset Button ////
        const resetButton = document.createElement('button');
        resetButton.id = 'reset-button';
        resetButton.innerText = 'Reset Game';
        resetButton.classList.add('bg-slate-200', 'text-slate-900', 'text-2xl', 'font-bold', 'rounded', 'p-2', 'max-md:w-1/2', 'mx-auto', 'mt-4', 'hover:bg-slate-300', 'transition', 'duration-300', 'ease-in-out','max-md:translate-y-[-50%]');
        document.querySelector('#bottom-part').appendChild(resetButton);
        resetButton.addEventListener('click', function () {
            game.playGame();
            const winnerDiv = document.querySelector('#announcment');
            winnerDiv.innerHTML = '';
        });


        //// Go Back Page ////
        const backButton = document.createElement('button');
        backButton.id = 'back-button';
        backButton.innerText = 'Go Back';
        backButton.classList.add('bg-slate-200', 'text-slate-900', 'text-2xl', 'font-bold', 'rounded', 'p-2', 'max-md:w-1/2', 'mx-auto', 'mt-4', 'hover:bg-slate-300', 'transition', 'duration-300', 'ease-in-out','max-md:translate-y-[-50%]');
        document.querySelector('#bottom-part').appendChild(backButton);
        backButton.addEventListener('click', function () {
            location.reload();
        });

    }
}


export function updateScore() {
    const player1Score = document.getElementById('player-1-score');
    const player2Score = document.getElementById('player-2-score');
    player1Score.textContent = 'Score: ' + game.player1.getScore();
    player2Score.textContent = 'Score: ' + game.player2.getScore();
}

export function updateTies(ties) {
    const tiesPtag = document.getElementById('ties');
    tiesPtag.textContent = 'Ties: ' + ties;
    const tieDiv = document.querySelector('#announcment');
    const tiePTag = document.createElement('p');
    tiePTag.classList.add('text-center', 'text-3xl', 'font-bold', 'text-slate-200');
    tiePTag.textContent = "it's a Tie!";
    tieDiv.innerHTML = '';
    tieDiv.appendChild(tiePTag);
    jsConfetti.addConfetti({
        emojis : ['😔'],
    });
}

export function displayWinner(name) {
    const winnerDiv = document.querySelector('#announcment');
    const winnerPTag = document.createElement('p');
    winnerPTag.classList.add('text-center', 'text-3xl', 'font-bold');
    if (name == player1Name){
        winnerPTag.classList.add('text-red-500');
    } else{
        winnerPTag.classList.add('text-blue-400');
    }
    winnerPTag.textContent = name+' Won!';
    winnerDiv.innerHTML = '';
    winnerDiv.appendChild(winnerPTag);
    jsConfetti.addConfetti()
}

export function getNames(){
    return [player1Name, player2Name];
}