import { string, func } from 'prop-types';
import S from './Square.module.scss';

Square.propTypes = {
  value: string,
  onSquareClick: func.isRequired,
};

function Square({ value, onSquareClick }) {
  return (
    <button className={S.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
