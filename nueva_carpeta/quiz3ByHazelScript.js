// Selección de elementos HTML por su ID y asignación a constantes
const turn = document.getElementById("turn"); // Muestra de quién es el turno actual (X o O)
const victoriesContainer = document.getElementById("victoriesContainer"); // Contenedor para mostrar victorias
const defeatsContainer = document.getElementById("defeatsContainer"); // Contenedor para mostrar derrotas
const tiesContainer = document.getElementById("tiesContainer"); // Contenedor para mostrar empates
const winner = document.getElementById("winner"); // Elemento para mostrar el mensaje del ganador
const btnRestart = document.getElementById("btnRestart"); // Botón para reiniciar el juego
const btnModePC = document.getElementById("btnModePC"); // Botón para cambiar al modo contra la PC
const btnModeTwoPlayers = document.getElementById("btnModeTwoPlayers"); // Botón para cambiar al modo de dos jugadores
const defeatsTitle = document.getElementById("defeatsTitle"); // Para cambio de titulo a cambiar si se esta en modo de de dos jugadores
const victoriesTitle = document.getElementById("victoriesTitle"); //Para cambio  de titulo a cambiar si se esta en modo de de dos jugadores

// Selección de las celdas del tablero, identificadas por su ID
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

// Variables globales para el estado del juego
let moves = []; // Almacena los movimientos realizados
let victories = 0; // Contador de victorias
let defeats = 0; // Contador de derrotas
let ties = 0; // Contador de empates
let jugadorT = "X"; // Indica el jugador actual, empezando con "X"
let gameOver = false; // Indica si el juego ha terminado
let isPlayerTurn = true; // Indica si es el turno del jugador (en modo contra la PC)
let isAgainstPC = true; // Por defecto, se juega contra la PC

// Recuperación de estadísticas almacenadas en localStorage
const storedVictories = JSON.parse(localStorage.getItem("storVictories")) || 0;
const storedDefeats = JSON.parse(localStorage.getItem("storDefeats")) || 0;
const storedTies = JSON.parse(localStorage.getItem("storTies")) || 0;
victories = storedVictories;
defeats = storedDefeats;
ties = storedTies;

// Actualización de los contenedores con los datos recuperados
victoriesContainer.textContent = victories;
defeatsContainer.textContent = defeats;
tiesContainer.textContent = ties;

// Función para habilitar o deshabilitar clics en las celdas
function toggleCellClicks(enable) {
    boxes.forEach(cell => {
        if (enable) {
            cell.style.pointerEvents = "auto"; // Permitir clics
        } else {
            cell.style.pointerEvents = "none"; // Deshabilitar clics
        }
    });
}

// Función que maneja el movimiento en modo dos jugadores
function playerMoveTwoPlayers(event) {
    if (!gameOver && event.target.textContent === "") { // Si el juego no ha terminado y la celda está vacía
        event.target.textContent = jugadorT; // Colocar la ficha del jugador actual
        moves.push(event.target.id); // Registrar el movimiento
        checkWinner(); // Verificar si alguien ganó

        // Cambiar el turno al otro jugador
        jugadorT = jugadorT === "X" ? "O" : "X";
        changePlayer(jugadorT); // Actualizar el indicador de turno

        toggleCellClicks(true); // Asegurar que los clics estén activos
    }
}

// Función que maneja el movimiento en modo contra la PC
function playerMovePC(event) {
    if (!gameOver && isPlayerTurn && event.target.textContent === "") {
        event.target.textContent = jugadorT; // Colocar la ficha del jugador
        moves.push(event.target.id); // Registrar el movimiento
        checkWinner(); // Verificar si alguien ganó

        if (!gameOver) { // Si el juego no terminó, pasa el turno a la PC
            jugadorT = "O";
            isPlayerTurn = false;
            toggleCellClicks(false); // Bloquear clics mientras la PC juega
            setTimeout(randomMove, 600); // Esperar 600ms antes de que la PC haga su movimiento
        }
    }
}

// Movimiento aleatorio de la PC
function randomMove() {
    if (!gameOver && !isPlayerTurn) {
        let emptyBoxes = boxes.filter(box => box.textContent === ""); // Identificar celdas vacías
        if (emptyBoxes.length === 0) return; // Salir si no hay celdas disponibles

        let pcMove = Math.floor(Math.random() * emptyBoxes.length); // Elegir una celda al azar
        emptyBoxes[pcMove].textContent = "O"; // Colocar la ficha de la PC
        moves.push(emptyBoxes[pcMove].id); // Registrar el movimiento
        checkWinner(); // Verificar si alguien ganó

        if (!gameOver) { // Si el juego no terminó, pasa el turno al jugador
            jugadorT = "X";
            isPlayerTurn = true;
            changePlayer(jugadorT); // Actualizar el indicador de turno
            toggleCellClicks(true); // Permitir clics nuevamente
        }
    }
}

// Verificar si hay un ganador o empate
function checkWinner() {
    const winnerCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (let combination of winnerCombinations) {
        const [a, b, c] = combination;
        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent &&
            boxes[a].textContent === boxes[c].textContent) {
            if (boxes[a].textContent === "X") {
                victories += 1;
                victoriesContainer.textContent = victories;
                winner.textContent = `¡Victoria!`;
            } else if (boxes[a].textContent === "O") {
                defeats += 1;
                defeatsContainer.textContent = defeats;
                winner.textContent = isAgainstPC ? `¡Derrota!` : `¡Victoria de O!`;
            }
            gameOver = true; // Marcar el juego como terminado
            return;
        }
    }

    if (moves.length === 9 && !gameOver) { // Si todas las celdas están llenas y no hay ganador
        ties += 1;
        tiesContainer.textContent = ties;
        winner.textContent = "¡Es un empate!";
        gameOver = true; // Marcar el juego como terminado
    }
}

// Cambiar el indicador de turno
function changePlayer(player) {
    turn.innerHTML = player; // Mostrar el jugador actual
}

// Función para reiniciar el juego
function restartGame() {
    // Reiniciar las variables de estado
    moves = [];
    gameOver = false;
    winner.textContent = "";
    jugadorT = "X"; // Resetear a jugador X
    isPlayerTurn = true; // Volver a iniciar el turno con el jugador

    // Limpiar el tablero
    boxes.forEach(box => {
        box.textContent = ""; // Limpiar las celdas
    });

    // Cambiar el turno al jugador X
    changePlayer(jugadorT);

    // Habilitar clics en las celdas
    toggleCellClicks(true);
}

// Función para reiniciar estadísticas
function resetStats() {
    victories = 0;
    defeats = 0;
    ties = 0;
    victoriesContainer.textContent = victories;
    defeatsContainer.textContent = defeats;
    tiesContainer.textContent = ties;
}

// Asignar eventos a los botones
btnRestart.addEventListener("click", restartGame);

btnModePC.addEventListener("click", () => {
    resetStats(); // Reiniciar estadísticas
    isAgainstPC = true;
    restartGame(); // Reiniciar el juego al cambiar el modo
    boxes.forEach(box => {
        box.removeEventListener("click", playerMoveTwoPlayers); // Eliminar evento de dos jugadores
        box.addEventListener("click", playerMovePC); // Establecer evento de PC
    });
    defeatsTitle.textContent = "Derrotas";
    victoriesTitle.textContent = "Victorias";
});

btnModeTwoPlayers.addEventListener("click", () => {
    resetStats(); // Reiniciar estadísticas
    isAgainstPC = false;
    restartGame(); // Reiniciar el juego al cambiar el modo
    boxes.forEach(box => {
        box.removeEventListener("click", playerMovePC); // Eliminar evento de PC
        box.addEventListener("click", playerMoveTwoPlayers); // Establecer evento de dos jugadores
    });
    defeatsTitle.textContent = "Victorias O";
    victoriesTitle.textContent = "Victorias X";
});

// Asignar eventos a las celdas del tablero (modo por defecto: PC)
boxes.forEach(box => {
    box.addEventListener("click", playerMovePC);
});
