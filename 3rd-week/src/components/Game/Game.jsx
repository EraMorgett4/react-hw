import { useState, useEffect, useRef } from 'react';
import Board from '@/components/Board/Board';
import History from '@/components/History/History';
import Status from '@/components/Status/Status';
import S from './Game.module.scss';
import { handlePlay } from '@/utils/gameLogic';
import { PLAYER } from '@/constants/constants';

function Game() {
  const boardSize = 19; // 보드 크기 설정
  const [history, setHistory] = useState([Array(boardSize * boardSize).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [lastMove, setLastMove] = useState({ row: null, col: null });

  const historyEndRef = useRef(null);

  const currentSquares = history[currentMove];

  const onSquareClick = (index) => {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    handlePlay({
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
    });
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setIsNext(move % 2 === 0);
    setWinner(null);
    setIsDraw(false);
    setLastMove({ row: null, col: null }); // 좌표 초기화
  };

  useEffect(() => {
    // history가 업데이트될 때마다 스크롤바를 맨 아래로 이동
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className={S.game}>
      <Status winner={winner} nextPlayer={isNext ? PLAYER.ONE : PLAYER.TWO} isDraw={isDraw} />
      <div className={S.game__board}>
        <Board squares={currentSquares} onPlay={onSquareClick} boardSize={boardSize} />
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
