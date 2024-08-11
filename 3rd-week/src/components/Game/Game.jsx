import { useState, useEffect, useRef } from 'react';
import Board from '../Board/Board';
import History from '../History/History';
import S from './Game.module.scss';

function Game() {
  const boardSize = 19; // 보드 크기 설정
  const [history, setHistory] = useState([Array(boardSize * boardSize).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const historyEndRef = useRef(null);

  const currentSquares = history[currentMove];

  const calculateWinner = (squares) => {
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
  };

  const handlePlay = (index) => {
    if (currentSquares[index] || winner) return;

    const nextSquares = currentSquares.slice();
    nextSquares[index] = isNext ? 'X' : 'O';

    const gameWinner = calculateWinner(nextSquares);
    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    // 무승부 체크: 모든 칸이 채워졌지만 승자가 없으면 무승부로 설정
    if (nextSquares.every((square) => square !== null)) {
      setIsDraw(true);
    } else {
      setIsNext(!isNext);
      setHistory([...history.slice(0, currentMove + 1), nextSquares]);
      setCurrentMove(currentMove + 1);
    }
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setIsNext(move % 2 === 0);
    setWinner(null);
    setIsDraw(false);
  };

  useEffect(() => {
    // history가 업데이트될 때마다 스크롤바를 맨 아래로 이동
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className={S.game}>
      <div className={S.game__board}>
        <Board
          winnerInfo={{ winner }}
          nextPlayer={isNext ? 'X' : 'O'}
          isDraw={isDraw}
          squares={currentSquares}
          onPlay={handlePlay}
          boardSize={boardSize}
        />
      </div>
      <div className={S.game__historyWrapper}>
        <h2 className={S.history__title}>Game History</h2>
        <div className={S.game__history}>
          <History history={history} jumpTo={jumpTo} currentMove={currentMove} />
          <div ref={historyEndRef} /> {/* 스크롤의 끝을 표시 */}
        </div>
      </div>
    </div>
  );
}

export default Game;
