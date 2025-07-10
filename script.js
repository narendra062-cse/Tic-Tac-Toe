const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let cells = Array(9).fill("");

// Create cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  board.appendChild(cell);
}

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function isDraw() {
  return cells.every(cell => cell !== "");
}

board.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("cell") && !cells[index]) {
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
      message.textContent = `🎉 Player ${currentPlayer} wins!`;
      board.style.pointerEvents = "none";
    } else if (isDraw()) {
      message.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
});

resetButton.addEventListener("click", () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  message.textContent = "Player X's turn";
  board.style.pointerEvents = "auto";

  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
  });
});
