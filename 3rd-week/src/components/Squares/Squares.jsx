import { arrayOf, string, func, number } from 'prop-types';
import Square from '../Square/Square';
import S from './Squares.module.scss';

Squares.propTypes = {
  squares: arrayOf(string).isRequired,
  onPlay: func.isRequired,
  boardSize: number.isRequired,
};

function Squares({ squares, onPlay, boardSize }) {
  const renderRow = (rowIndex) => {
    const row = [];
    for (let i = 0; i < boardSize; i++) {
      row.push(
        <Square
          key={rowIndex * boardSize + i}
          value={squares[rowIndex * boardSize + i]}
          onSquareClick={() => onPlay(rowIndex * boardSize + i)}
        />
      );
    }
    return row;
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < boardSize; i++) {
      board.push(
        <div key={i} className={S.board__row}>
          {renderRow(i)}
        </div>
      );
    }
    return board;
  };

  return <div className={S.board}>{renderBoard()}</div>;
}

export default Squares;
