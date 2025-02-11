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
    document.getElementById("cell8")]

    let moves = []

    //logre que se almacenen las movidas x, pero aun no aplico funcionalidad para que la pc marque "O"
boxes.forEach(cell => {
    cell.addEventListener("click", function() {
        cell.innerText = "X";
        moves.push(cell.id)
        localStorage.setItem("storMoves", (moves));
    });
    
});