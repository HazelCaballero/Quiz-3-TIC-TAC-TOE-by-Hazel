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
]

    let moves = []
    let jugadorT = "X";
    let gameOver = false;

    //logre que se almacenen las movidas x, pero aun no aplico funcionalidad para que la pc marque "O"
function playerMove(){
    boxes.forEach(cell => {
    cell.addEventListener("click", function() {
        cell.textContent = "X";
        moves.push(cell.id)
        localStorage.setItem("storMoves", (moves));
        setTimeout(() => {
            randomMove()
        }, 600);
    });
});
}

//filtro para saber cuales estan vacias
function randomMove() {
    
    let emptyBoxes = boxes.filter(box => box.textContent === "")
    if(emptyBoxes.length === 0)
        return;

//para que la pc escoja aleatoriamente uno de esos espacios vacios y ponga en su contenido "O"
    let pcPushORandom = Math.floor(Math.random()*emptyBoxes.length);
    emptyBoxes[pcPushORandom].textContent ="O";
    moves.push(emptyBoxes[pcPushORandom].id);
}


// para comprobar ganador
const winnerCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

// no se si voy bien pero lo voy a guardar asi antes de almuerzo para evitar perder informacion
function checkWinner() {
    for(let combination of winnerCombinations){
        const [a,b,c] = combination;
        if(boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && 
            boxes[a].textContent ===boxes[c].textContent){
                
            }
    }
}

playerMove()


