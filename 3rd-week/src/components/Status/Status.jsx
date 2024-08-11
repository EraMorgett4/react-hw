import { string, bool } from 'prop-types';
import S from './Status.module.scss';
import { PLAYER } from '../../constants/constants';

Status.propTypes = {
  winner: string,
  nextPlayer: string.isRequired,
  isDraw: bool.isRequired,
};

function Status({ winner, nextPlayer, isDraw }) {
  const status = winner
    ? `${winner}가 승리했습니다!`
    : isDraw
      ? '비겼습니다.'
      : `현재 차례: ${nextPlayer}`;

  return <header className={S.status}>{status}</header>;
}

export default Status;
