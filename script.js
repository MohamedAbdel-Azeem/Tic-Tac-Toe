import { game } from "./gameScript.js";

// Select the button and input elements
const player1Button = document.getElementById('player-1-ready');
const player1Input = player1Button.previousElementSibling;

const player2Button = document.getElementById('player-2-ready');
const player2Input = player2Button.previousElementSibling;


let imgSrc = './assets/check.svg';
let player1Ready = false;
let player2Ready = false;
// Add event listeners to the buttons
player1Button.addEventListener('click', function() {
    const player1Tag = document.createElement('p');
    player1Tag.classList.add('text-center', 'text-2xl', 'text-slate-200');
    if (player1Input.value !== '') {
        player1Tag.textContent = player1Input.value;
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
        player2Tag.textContent = player2Input.value;
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
    
        player1Card.style.transform = 'translateX(-160%)';
        
        player2Card.style.transform = 'translateX(160%)';
        game.startNewGame();
    }
}
