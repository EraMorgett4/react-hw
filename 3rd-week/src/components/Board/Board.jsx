import { string, arrayOf, func, number } from 'prop-types';
import Squares from '../Squares/Squares';
import S from './Board.module.scss';

Board.propTypes = {
  squares: arrayOf(string).isRequired,
  onPlay: func.isRequired,
  boardSize: number.isRequired,
};

function Board({ squares, onPlay, boardSize }) {
  return (
    <section className={S.board}>
      <Squares squares={squares} onPlay={onPlay} boardSize={boardSize} />
    </section>
  );
}

export default Board;
