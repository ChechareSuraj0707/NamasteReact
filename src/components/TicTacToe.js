import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>You're Offline — Play Tic Tac Toe 🎮</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              background: "#eee",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && <h3>Winner: {winner}</h3>}

      <button
        onClick={resetGame}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Restart
      </button>
    </div>
  );
};

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default TicTacToe;
