import { arrayOf, string, func, number } from 'prop-types';
import S from './History.module.scss';

History.propTypes = {
  history: arrayOf(arrayOf(string)).isRequired,
  jumpTo: func.isRequired,
  currentMove: number.isRequired,
};

function History({ history, jumpTo, currentMove }) {
  return (
    <ol className={S.history}>
      {history.map((squares, move) => {
        const description = move > 0 ? `${move}번째 기보로 이동` : '처음으로';
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
      })}
    </ol>
  );
}

export default History;
