import { PLAYER } from '@/constants/constants';

export function calculateWinner(squares, boardSize) {
  const lines = [];

  // 가로와 세로 체크
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize - 4; col++) {
      lines.push([
        row * boardSize + col,
        row * boardSize + col + 1,
        row * boardSize + col + 2,
        row * boardSize + col + 3,
        row * boardSize + col + 4,
      ]);

      lines.push([
        col * boardSize + row,
        (col + 1) * boardSize + row,
        (col + 2) * boardSize + row,
        (col + 3) * boardSize + row,
        (col + 4) * boardSize + row,
      ]);
    }
  }

  // 대각선 체크 (\와 /)
  for (let row = 0; row < boardSize - 4; row++) {
    for (let col = 0; col < boardSize - 4; col++) {
      lines.push([
        row * boardSize + col,
        (row + 1) * boardSize + col + 1,
        (row + 2) * boardSize + col + 2,
        (row + 3) * boardSize + col + 3,
        (row + 4) * boardSize + col + 4,
      ]);

      lines.push([
        (row + 4) * boardSize + col,
        (row + 3) * boardSize + col + 1,
        (row + 2) * boardSize + col + 2,
        (row + 1) * boardSize + col + 3,
        row * boardSize + col + 4,
      ]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d] &&
      squares[a] === squares[e]
    ) {
      return squares[a];
    }
  }
  return null;
}

export function handlePlay({
  index,
  currentSquares,
  isNext,
  winner,
  history,
  currentMove,
  boardSize,
  calculateWinner,
  setHistory,
  setCurrentMove,
  setIsNext,
  setWinner,
  setIsDraw,
}) {
  if (currentSquares[index] || winner) return;

  const nextSquares = currentSquares.slice();
  nextSquares[index] = isNext ? PLAYER.ONE : PLAYER.TWO;

  const gameWinner = calculateWinner(nextSquares, boardSize);
  if (gameWinner) {
    setWinner(gameWinner);
    setIsDraw(false);
    setHistory([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove(currentMove + 1);
    return;
  }

  if (nextSquares.every((square) => square !== null)) {
    setIsDraw(true);
    setWinner(null);
  } else {
    setIsNext(!isNext);
  }

  setHistory([...history.slice(0, currentMove + 1), nextSquares]);
  setCurrentMove(currentMove + 1);
}
