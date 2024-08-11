import { PLAYER } from '@/constants/constants';

export const calculateWinner = (squares, boardSize, lastMoveRow, lastMoveCol) => {
  const lastMoveIndex = lastMoveRow * boardSize + lastMoveCol;
  const player = squares[lastMoveIndex];
  // console.log(squares);

  if (!player) return null;

  const directions = [
    { row: 0, col: 1 }, // 가로
    { row: 1, col: 0 }, // 세로
    { row: 1, col: 1 }, // \
    { row: 1, col: -1 }, // /
  ];

  const countInRow = (dirRow, dirCol) => {
    let count = 0;
    let row = lastMoveRow;
    let col = lastMoveCol;

    while (
      row >= 0 &&
      row < boardSize &&
      col >= 0 &&
      col < boardSize &&
      squares[row * boardSize + col] === player
    ) {
      count++;
      row += dirRow;
      col += dirCol;
    }

    row = lastMoveRow - dirRow;
    col = lastMoveCol - dirCol;

    while (
      row >= 0 &&
      row < boardSize &&
      col >= 0 &&
      col < boardSize &&
      squares[row * boardSize + col] === player
    ) {
      count++;
      row -= dirRow;
      col -= dirCol;
    }

    return count;
  };

  for (let i = 0; i < directions.length; i++) {
    const { row, col } = directions[i];
    if (countInRow(row, col) >= 5) {
      return player;
    }
  }

  return null;
};

export const handlePlay = ({
  index,
  currentSquares,
  isNext,
  winner,
  history,
  currentMove,
  boardSize,
  row,
  col,
  setHistory,
  setCurrentMove,
  setIsNext,
  setWinner,
  setIsDraw,
  setLastMove,
}) => {
  if (currentSquares[index] || winner) return;

  const nextSquares = currentSquares.slice();
  nextSquares[index] = isNext ? PLAYER.ONE : PLAYER.TWO;

  // 승자 확인
  const gameWinner = calculateWinner(nextSquares, boardSize, row, col);
  if (gameWinner) {
    setWinner(gameWinner);
    setIsDraw(false);
    setHistory([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove(currentMove + 1);
    return;
  }

  // 무승부 확인
  if (nextSquares.every((square) => square !== null)) {
    setIsDraw(true);
    setWinner(null);
  } else {
    // 승자도 없고 무승부도 아니면 다음 플레이어에게 차례를 넘김
    setIsNext(!isNext);
    setHistory([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove(currentMove + 1);
    setLastMove({ row, col }); // 마지막으로 놓은 돌의 좌표 업데이트
  }
};
