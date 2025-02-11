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

    //estoy intentado almacenar los movimientos de x para luego consultar cuales estan llenas o no y crear
    // la funcion que colo una O en un espacio vacio, pero algo estoy haciendo mal y aun no se me ocurre
    //mas lo comento porque quiero hacer una actualizacion en git un rato antes de salir para evitar 
    // falta de respaldo
boxes.forEach(cell => {
    cell.addEventListener("click", function() {
        cell.innerText = "X";
    });
    localStorage.setItem("storMoves", JSON.stringify(moves))
});








