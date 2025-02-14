const turn = document.getElementById("turn")
const scoreboard = document.getElementById("scoreboard")
const victoriesContainer = document.getElementById("victoriesContainer")
const defeatsContainer = document.getElementById("defeatsContainer")
const tiesContainer = document.getElementById("tiesCOntainer")
const winner = document.getElementById("winner")
const btnRestart = document.getElementById("btnRestart")
const gameBoard = document.getElementById("gameBoard")

const boxes = [
    document.getElementById("cell0"),
    document.getElementById("cell1"),
    document.getElementById("cell2"),
    document.getElementById("cell3"),
    document.getElementById("cell4"),
    document.getElementById("cell5"),
    document.getElementById("cell6"),
    document.getElementById("cell7"),
    document.getElementById("cell8")
];

let moves = [];
let victories = 0;
let defeats = 0;
let ties = 0;
let jugadorT = "X";
let gameOver = false;

localStorage.setItem("storVictories", JSON.stringify(victories));
localStorage.setItem("storDefeats", JSON.stringify(defeats));
localStorage.setItem("storTies", JSON.stringify(ties));

//funcion movimiento of player
function playerMove() {
    boxes.forEach(cell => {
        cell.addEventListener("click", function () {
            if (!gameOver && cell.textContent === "") {
                cell.textContent = "X";
                moves.push(cell.id);
                localStorage.setItem("storMoves", JSON.stringify(moves));
                checkWinner();
                console.log(moves);
                if (!gameOver) {
                    setTimeout(randomMove, 600);
                }
            }
        });
    });
}

//filtro para saber cuales estan empty
function randomMove() {

    let emptyBoxes = boxes.filter(box => box.textContent === "");
    if (emptyBoxes.length === 0) return;

    //para que la pc escoja aleatoriamente uno de esos espacios vacios y ponga en su contenido "O"
    let pcMove = Math.floor(Math.random() * emptyBoxes.length);
    emptyBoxes[pcMove].textContent = "O";
    moves.push(emptyBoxes[pcMove].id);
    console.log(moves);
    checkWinner();
}


// variables con win
const winnerCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// no se si voy bien 
function checkWinner() {
    for (let combination of winnerCombinations) {
        const [a, b, c] = combination;
        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent &&
            boxes[a].textContent === boxes[c].textContent) {
            if (boxes[a].textContent === "X") {
                victories += 1;
                victoriesContainer.textContent = victories
                winner.textContent = winner.textContent = `¡Victoria!`
                gameOver = true;
            }
            if (boxes[a].textContent === "O") {
                defeats += 1;
                defeatsContainer.textContent = defeats
                winner.textContent = winner.textContent = `¡Derrota!`
                gameOver = true;
            }
           }
            else if (moves.length === 9 && !gameOver) {
                ties += 1;
                tiesContainer.textContent = ties
                winner.textContent = "¡Es un empate!";
                gameOver = true; } 
            }
            
}

//btnreiniciar
btnRestart.addEventListener("click", function () {
    boxes.forEach(cell => cell.textContent = "");
    moves = [];
    gameOver = false
    winner.textContent = "";
    localStorage.clear();
    jugadorT = "X";
    turn.textContent = "Turno:";
});

playerMove()