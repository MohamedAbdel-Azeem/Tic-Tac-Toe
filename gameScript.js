////////////// This Script is for both the Game Model and its UI //////////////////////
import { updateScore,displayWinner,getNames, updateTies } from './script.js';


export let game = (
    function () {
        let board;
        
        /**
         * Creates a user object with a name, mark, and score.
         * @param {string} name - The name of the user.
         * @param {string} mark - The mark (X or O) of the user.
         * @returns {Object} The user object.
         */
        const createUser = function (name, mark) {
            let score = 0;
            const getName = ()=> name;
            const setname = (newName)=> name = newName;
            const getMark = ()=> mark;
            const getScore = ()=> score;
            const addScore = ()=> score++;
            return {getName,setname ,getMark, getScore, addScore};
        }

        let ties = 0;
        
        let player1 = createUser("player 1", "X");
        let player2 = createUser("player 2", "O");

        /**
         * Plays the Tic-Tac-Toe game.
         * @returns {Object} An object with the game board and a function to toggle the current player.
         */
        const playGame = function () {
            const names = getNames();
            player1.setname(names[0]);
            player2.setname(names[1]);
            let currentPlayer = 0;
            const getBoard = ()=> board;
            const togglePlayer = ()=> (currentPlayer == 0) ? currentPlayer = 1 : currentPlayer = 0;
            board = Array.from({ length: 3 }, () => Array(3).fill(null));

            /**
             * Checks if the current player has won the game.
             * @returns {boolean} True if the current player has won, false otherwise.
             */
            function checkWin() {
                let win = false;
                let candidatePlayer = (currentPlayer == 0) ? player1 : player2;
                let mark = candidatePlayer.getMark();
                // check rows
                for (let i = 0; i < 3; i++) {
                    if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
                        win = true;
                        break;
                    }
                }
                // check columns
                for (let i = 0; i < 3; i++) {
                    if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
                        win = true;
                        break;
                    }
                }
                // check diagonals
                if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
                    win = true;
                }
                if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
                    win = true;
                }
                if (win) candidatePlayer.addScore();
                return win;
            }

            /**
             * Checks if the game is a tie.
             * @returns {boolean} True if the game is a tie, false otherwise.
             */
            function checkTie() {
                return ! checkWin() && board.every(row => row.every(cell => cell != null));
            }

            /**
             * Draws the game board in the HTML document.
             */
            function drawBoard() {
                const gameDiv = document.querySelector("#game-board");
                let candidatePlayer = (currentPlayer == 0) ? player1 : player2;
                gameDiv.innerHTML = "";
                for (let i = 0; i < 3; i++) { // initialize game board
                    let row = document.createElement("div");
                    row.classList.add("flex", "flex-row", "w-full", "justify-center");
                    for (let j = 0; j < 3; j++) {
                        let cell = document.createElement("div");
                        cell.classList.add("bg-blue-200","flex","justify-center","items-center","text-white", 'w-28', 'h-28', 'border','border-indigo-950', 'text-center', 'text-6xl', 'font-bold', 'cursor-pointer');
                        cell.id = "cell" + i + j;
                        if (board[i][j] == null){
                            cell.textContent = "";
                        } else {
                            cell.textContent = board[i][j];
                            if (board[i][j] == player1.getMark()){
                                cell.style.color = '#dc2626';
                            } else {
                                cell.style.color = '#1d4ed8';
                            }
                        }
                        cell.textContent = (board[i][j] == null) ? "" : board[i][j];
                        cell.addEventListener("click", function () {
                            if (board[i][j] == null && !checkWin() && !checkTie()) {
                                board[i][j] = (currentPlayer == 0) ? player1.getMark() : player2.getMark();
                                cell.textContent = board[i][j];
                                if (checkWin()) {
                                    updateScore();
                                    displayWinner(candidatePlayer.getName());
                                } else if (checkTie()) {
                                    ties++;
                                    updateTies(ties);
                                } else {
                                    togglePlayer();
                                }
                                drawBoard();
                            }
                        });
                        row.appendChild(cell);
                    }
                    gameDiv.appendChild(row);
                }
            }
            drawBoard();
            return {getBoard, togglePlayer};
        }
        return {playGame, player1, player2, ties};
    }
)();




