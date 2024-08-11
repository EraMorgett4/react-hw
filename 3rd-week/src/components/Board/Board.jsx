import { shape, string, bool, arrayOf, func, number } from 'prop-types';
import Squares from '../Squares/Squares';
import Status from '../Status/Status';
import S from './Board.module.scss';

Board.propTypes = {
  winnerInfo: shape({
    winner: string,
  }),
  nextPlayer: string.isRequired,
  isDraw: bool.isRequired,
  squares: arrayOf(string).isRequired,
  onPlay: func.isRequired,
  boardSize: number.isRequired,
};

function Board({ winnerInfo, nextPlayer, isDraw, squares, onPlay, boardSize }) {
  return (
    <section className={S.board}>
      <Status winner={winnerInfo?.winner} nextPlayer={nextPlayer} isDraw={isDraw} />
      <Squares squares={squares} onPlay={onPlay} boardSize={boardSize} />
    </section>
  );
}

export default Board;
