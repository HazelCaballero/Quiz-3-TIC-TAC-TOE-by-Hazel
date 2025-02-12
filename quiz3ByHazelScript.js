const turn = document.getElementById("turn")
const scoreboard = document.getElementById("scoreboard")
const victories = document.getElementById("victories")
const defeats = document.getElementById("defeats")
const ties = document.getElementById("ties")
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
    let jugadorT = "X";
    let gameOver = false;

    //funcion movimiento of player
    function playerMove() {
        boxes.forEach(cell => 
            { cell.addEventListener("click", function () {
                    if (!gameOver) {
                        cell.textContent = "X"; 
                        moves.push(cell.id);
                        localStorage.setItem("storMoves", JSON.stringify(moves)); 
                        checkWinner(); 
                        if (!gameOver) {
                            setTimeout(() => { randomMove(); }, 600); 
                        }
                    }
                });
        });
    }

//filtro para saber cuales estan empty
function randomMove() {
    
    let emptyBoxes = boxes.filter(box => box.textContent === "");
    if(emptyBoxes.length === 0) return;

//para que la pc escoja aleatoriamente uno de esos espacios vacios y ponga en su contenido "O"
    let pcPushORandom = Math.floor(Math.random()*emptyBoxes.length);
    emptyBoxes[pcPushORandom].textContent ="O";
    moves.push(emptyBoxes[pcPushORandom].id);
    checkWinner();
}


// variables con win
const winnerCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// no se si voy bien 
function checkWinner() {
    for(let combination of winnerCombinations){
        const [a,b,c] = combination;
        if(boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && 
            boxes[a].textContent ===boxes[c].textContent){
                winner.textContent = `¡${boxes[a].textContent}gana!`
                gameOver = true;
                }
            }
            //intente solucionar la mala funcion de la logica de empate porque si tenia solo el,
            //  moves.length === 9 y se ganaba en el ultimo movimiento decia empate = error logico
            if(moves.length === 9 && boxes[a].textContent && boxes[a].textContent === 
                boxes[b].textContent && boxes[a].textContent === boxes[c].textContent){
                    winner.textContent = "¡Es un empate!";
                    gameOver = true;
    }
}

//btnreiniciar
btnRestart.addEventListener("click", function(){
    boxes.forEach(cell => cell.textContent = "");
    moves =[];
    gameOver = false
    winner.textContent ="";
    localStorage.clear()
}
);

playerMove()


