import { arrayOf, string, func, number } from 'prop-types';
import S from './History.module.scss';

History.propTypes = {
  history: arrayOf(arrayOf(string)).isRequired,
  jumpTo: func.isRequired,
  currentMove: number.isRequired,
};

function History({ history, jumpTo, currentMove }) {
  const getDescription = (move) => {
    return move > 0 ? `${move}번째 수로 이동` : '처음으로';
  };

  const renderHistoryItems = () => {
    return history.map((squares, move) => {
      const description = getDescription(move);
      return (
        <li key={move} className={S.history__item}>
          <button
            className={`${S.history__button} ${move === currentMove ? S.active : ''}`}
            onClick={() => jumpTo(move)}
          >
            {description}
          </button>
        </li>
      );
    });
  };

  return <ol className={S.history}>{renderHistoryItems()}</ol>;
}

export default History;
