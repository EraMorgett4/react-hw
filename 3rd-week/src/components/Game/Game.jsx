import { useState, useEffect, useRef } from 'react';
import Board from '@/components/Board/Board';
import History from '@/components/History/History';
import S from './Game.module.scss';
import { PLAYER } from '@/constants/constants';
import { handlePlay, calculateWinner } from '@/utils/gameLogic';

function Game() {
  const boardSize = 19; // 보드 크기 설정
  const [history, setHistory] = useState([Array(boardSize * boardSize).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const historyEndRef = useRef(null);

  const currentSquares = history[currentMove];

  const onSquareClick = (index) => {
    handlePlay({
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
    });
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
          nextPlayer={isNext ? PLAYER.ONE : PLAYER.TWO}
          isDraw={isDraw}
          squares={currentSquares}
          onPlay={onSquareClick}
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
