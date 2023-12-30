export let game = (
    function () {
        let board;
        
        const createUser = function (name, mark) {
            let score = 0;
            const getName = ()=> name;
            const getMark = ()=> mark;
            const getScore = ()=> score;
            const addScore = ()=> score++;
            return {getName, getMark, getScore, addScore};
        }

        let player1 = createUser("Player 1", "X");
        let player2 = createUser("Player 2", "O");
        let ties = 0;
        const startNewGame = function () {
            let currentPlayer = 0;
            const getBoard = ()=> board;
            const getCurrentPlayer = ()=> currentPlayer;
            const togglePlayer = ()=> (currentPlayer == 0) ? currentPlayer = 1 : currentPlayer = 0;
            board = Array.from({ length: 3 }, () => Array(3).fill(null));

            function checkWin() {
                let win = false;
                let mark = (currentPlayer == 0) ? player1.getMark() : player2.getMark();
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
                if (win) console.log("Player " + (currentPlayer + 1) + " wins!");
                return win;
            }

            function checkTie() {
                return ! checkWin() && board.every(row => row.every(cell => cell != null));
            }

            function drawBoard() {
                const gameDiv = document.querySelector("#game-board");
                gameDiv.innerHTML = "";
                for (let i = 0; i < 3; i++) { // initialize game board
                    let row = document.createElement("div");
                    row.classList.add("row");
                    for (let j = 0; j < 3; j++) {
                        let cell = document.createElement("div");
                        cell.classList.add("cell");
                        cell.id = "cell" + i + j;
                        cell.textContent = (board[i][j] == null) ? "" : board[i][j];
                        cell.addEventListener("click", function () {
                            if (board[i][j] == null && !checkWin() && !checkTie()) {
                                board[i][j] = (currentPlayer == 0) ? player1.getMark() : player2.getMark();
                                cell.textContent = board[i][j];
                                if (checkWin()) {
                                    console.log("Player " + (currentPlayer + 1) + " wins!");
                                    (currentPlayer == 0) ? player1.addScore() : player2.addScore();
                                } else if (checkTie()) {
                                    console.log("Tie!");
                                    ties++;
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
            return {getBoard, getCurrentPlayer, togglePlayer};
        }
        return {startNewGame, player1, player2, ties};
    }
)();

// game.startNewGame();


// document.querySelector("#reset-button")
// .addEventListener("click", function () {
//     game.startNewGame();
// });